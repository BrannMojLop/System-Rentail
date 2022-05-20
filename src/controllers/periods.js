const connect = require('../config/database');
const Period = require('../models/Period');
const User = require('../models/User');

async function showPeriods(req, res) {
    await connect();

    if (req.body.require || req.body.limit) {
        if (!req.body.limit) {
            req.body.limit = Infinity;
        } else if (!req.body.require) {
            req.body.require = {
                _id: 1,
                name: 1,
                days: 1,
                createdAt: 1,
                status: 1,
                updatedAt: 1
            }
        }
    } else {
        req.body.require = {
            _id: 1,
            name: 1,
            days: 1,
            createdAt: 1,
            status: 1,
            updatedAt: 1
        }
        req.body.limit = Infinity;
    }

    if (req.query.name) {
        await Period.aggregate([
            {
                '$project': req.body.require
            },
            {
                '$limit': req.body.limit
            }, {
                '$match': { "name": { $regex: req.query.name, $options: "$i" } }
            }
        ], function (err, periods) {
            if (err) {
                res.status(401).send(err);
            } else if (periods.length > 0) {
                res.status(200).send(periods);
            } else {
                res.status(204).send("No se han encontrado registros");
            }
        })
    } else {
        await Period.find(function (err, periods) {
            if (err) {
                res.status(401).send(err);
            } else if (periods.length > 0) {
                res.status(200).send(periods);
            } else {
                res.status(204).send("No se han encontrado registros");
            }
        })
    }
}

async function createPeriod(req, res) {
    const period = new Period(req.body)

    await connect();

    const user = await User.findById(req.usuario.id);
    const type = await user.typeUser(user.id_type);

    if (type === 1) {
        await period.save(function (err) {
            if (err) {
                res.status(400).json({
                    success: false,
                    type: err.name,
                    error: err.message
                });
            } else {
                res.status(201).json({
                    success: "Periodo creado con Exito",
                    Period: period
                });
            }
        });
    } else {
        res.status(401).send("Permisos insuficientes")
    }
}


async function getPeriod(req, res) {
    await connect();
    try {
        const period = await Period.findById(req.params.id);
        if (!period) {
            res.status(204).send("No se han encontrado registros");
        } else {
            res.status(200).send(period);
        }
    } catch (err) {
        res.status(400).send(err)
    }
}

async function updatePeriod(req, res) {
    await connect();

    const user = await User.findById(req.usuario.id);
    const type = await user.typeUser(user.id_type);

    if (type === 1) {
        const period = await Period.findById(req.params.id, function (err) {
            if (err) {
                res.status(400).json({
                    error: err.name,
                    message: err.message
                })
            }
        });
        if (!period) {
            res.status(401).send("No se han encontrado el registro");
        } else {
            await Period.findByIdAndUpdate(req.params.id, {
                $set: req.body
            });
            res.status(200).send({
                message: 'Periodo Actualizado con Exito'
            });
        }
    } else {
        res.status(401).send("Permisos insuficientes")
    }
}

async function disablePeriod(req, res) {
    await connect();

    const user = await User.findById(req.usuario.id);
    const type = await user.typeUser(user.id_type);
    if (type === 1) {
        const period = await Period.findById(req.params.id, function (err) {
            if (err) {
                res.status(400).json({
                    error: err.name,
                    message: err.message
                })
            }
        });
        if (!period) {
            res.status(401).send("No se han encontrado el registro");
        } else {
            await Period.findByIdAndUpdate(req.params.id, {
                "status": false
            });
            res.status(200).send({
                message: 'Periodo Deshabilitado con Exito'
            });
        }
    } else {
        res.status(401).send("Permisos insuficientes")
    }
}

async function disablePeriods(req, res) {
    await connect();

    const user = await User.findById(req.usuario.id);
    const type = await user.typeUser(user.id_type);
    if (type === 1) {
        await Period.updateMany({ "status": false }, function (err, periods) {
            if (err) {
                res.status(401).send("No se han encontrado el registros");
            } else {
                res.status(200).send({
                    message: 'Periodos Deshabilitados con Exito'
                });
            }
        });
    } else {
        res.status(401).send("Permisos insuficientes")
    }
}

// exportamos las funciones definidas
module.exports = {
    createPeriod,
    showPeriods,
    getPeriod,
    disablePeriod,
    updatePeriod,
    disablePeriods
}
