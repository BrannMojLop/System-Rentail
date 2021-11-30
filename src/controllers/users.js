const connect = require("../config/database");
const User = require("../models/User");
const passport = require("passport");

async function showUsers(req, res) {
  await connect();

  if (req.body.require || req.body.limit) {
    if (!req.body.limit) {
      req.body.limit = Infinity;
    } else if (!req.body.require) {
      req.body.require = {
        firstname: 1,
        lastname: 1,
        email: 1,
        username: 1,
        status: 1,
        createdAt: 1,
        updatedAt: 1,
      };
    }
  } else {
    req.body.require = {
      firstname: 1,
      lastname: 1,
      email: 1,
      username: 1,
      status: 1,
      createdAt: 1,
      updatedAt: 1,
    };
    req.body.limit = Infinity;
  }

  const user = await User.findById(req.usuario.id);
  const type = await user.typeUser(user.id_type);

  if (type === 1) {
    if (req.query.firstname) {
      await User.aggregate(
        [
          {
            $project: req.body.require,
          },
          {
            $limit: req.body.limit,
          },
          {
            $match: {
              firstname: { $regex: req.query.firstname, $options: "$i" },
            },
          },
        ],
        function (err, users) {
          if (err) {
            res.status(401).send(err);
          } else if (users.length > 0) {
            res.status(200).send(users);
          } else {
            res.status(204).send("No se han encontrado registros");
          }
        }
      );
    } else if (req.query.lastname) {
      await User.aggregate(
        [
          {
            $project: req.body.require,
          },
          {
            $limit: req.body.limit,
          },
          {
            $match: {
              lastname: { $regex: req.query.lastname, $options: "$i" },
            },
          },
        ],
        function (err, users) {
          if (err) {
            res.status(401).send(err);
          } else if (users.length > 0) {
            res.status(200).send(users);
          } else {
            res.status(204).send("No se han encontrado registros");
          }
        }
      );
    } else if (req.query.username) {
      await User.aggregate(
        [
          {
            $project: req.body.require,
          },
          {
            $limit: req.body.limit,
          },
          {
            $match: {
              username: { $regex: req.query.username, $options: "$i" },
            },
          },
        ],
        function (err, users) {
          if (err) {
            res.status(401).send(err);
          } else if (users.length > 0) {
            res.status(200).send(users);
          } else {
            res.status(204).send("No se han encontrado registros");
          }
        }
      );
    } else {
      await User.aggregate(
        [
          {
            $project: req.body.require,
          },
          {
            $limit: req.body.limit,
          },
        ],
        function (err, users) {
          if (err) {
            res.status(401).send(err);
          } else if (users.length > 0) {
            res.status(200).send(users);
          } else {
            res.status(204).send("No se han encontrado registros");
          }
        }
      );
    }
  } else {
    res.status(401).send("Permisos insuficientes");
  }
}

async function createUser(req, res) {
  const body = req.body,
    password = body.password;

  delete body.password;
  const user = new User(body);
  user.createPassword(password);

  await connect();
  await user.save(function (err) {
    if (err) {
      res.status(400).json({
        success: false,
        type: err.name,
        error: err.message,
      });
    } else {
      res.status(201).json(user.toAuthJSON());
    }
  });
}

async function login(req, res, next) {
  if (!req.body.email) {
    return res.status(422).json({ errors: { email: "no puede estar vacío" } });
  }

  if (!req.body.password) {
    return res
      .status(422)
      .json({ errors: { password: "no puede estar vacío" } });
  }

  passport.authenticate(
    "local",
    { session: false },
    function (err, user, info) {
      if (err) {
        return next(err);
      }

      if (user) {
        user.token = user.generateJWT();
        return res.json({ user: user.toAuthJSON() });
      } else {
        return res.status(422).json(info);
      }
    }
  )(req, res, next);
}

async function getUser(req, res) {
  await connect();

  const user = await User.findById(req.usuario.id);
  const type = await user.typeUser(user.id_type);
  const userSearch = await User.findById(req.params.id);
  if (!user) {
    res.status(204).send("No se han encontrado registros");
  } else {
    if (type === 1) {
      res.status(200).send(userSearch.publicData());
    } else if (user.id == userSearch._id) {
      res.status(200).send(userSearch.publicData());
    } else {
      res.status(401).send("Permisos insuficientes");
    }
  }
}

async function updateUser(req, res) {
  await connect();

  const user = await User.findById(req.usuario.id);
  const type = await user.typeUser(user.id_type);
  const userSearch = await User.findById(req.params.id);
  if (!user) {
    res.status(204).send("No se han encontrado registros");
  } else {
    if (type === 2) {
      await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).send({
        message: "Usuario Actualizado con Exito",
      });
    } else if (user.id == userSearch._id) {
      if (req.body.password_new) {
        if (userSearch.validationPassword(req.body.password_current)) {
          const passwordNew = userSearch.updatePassword(req.body.password_new);
          delete req.body.password;
          req.body.salt = passwordNew[0];
          req.body.hash = passwordNew[1];
        } else {
          return res.status(400).send("La contraseña actual es incorrecta");
        }
      }

      await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).send({
        message: "Usuario Actualizado con Exito",
      });
    } else {
      res.status(401).send("Permisos insuficientes");
    }
  }
}

async function disableUser(req, res) {
  await connect();

  const user = await User.findById(req.usuario.id);
  const type = await user.typeUser(user.id_type);

  if (type === 1) {
    const user = await User.findById(req.params.id, function (err) {
      if (err) {
        res.status(400).json({
          error: err.name,
          message: err.message,
        });
      }
    });
    if (!user) {
      res.status(401).send("No se han encontrado el registro");
    } else {
      await User.findByIdAndUpdate(req.params.id, {
        status: false,
      });
      res.status(200).send({
        message: "Usuario Deshabilitado con Exito",
      });
    }
  } else {
    res.status(401).send("Permisos insuficientes");
  }
}

async function disableUsers(req, res) {
  await connect();

  const user = await User.findById(req.usuario.id);
  const type = await user.typeUser(user.id_type);

  if (type === 1) {
    await User.updateMany({ status: false }, function (err, users) {
      if (err) {
        res.status(401).send("No se han encontrado el registros");
      } else {
        res.status(200).send({
          message: "Usuarios Deshabilitados con Exito",
        });
      }
    });
  } else {
    res.status(401).send("Permisos insuficientes");
  }
}

// exportamos las funciones definidas
module.exports = {
  createUser,
  showUsers,
  getUser,
  disableUser,
  updateUser,
  disableUsers,
  login,
};
