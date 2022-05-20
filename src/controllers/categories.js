const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const connect = require('../config/database');
const Category = require('../models/Category');
const User = require('../models/User');



async function showCategories(req, res) {
    await connect();

    if (req.body.require || req.body.limit) {
        if (!req.body.limit) {
            req.body.limit = Infinity;
        } else if (!req.body.require) {
            req.body.require = {
                _id: 1,
                name: 1,
                id_sector: 1,
                description: 1,
                createdAt: 1,
                status: 1,
                updatedAt: 1
            }
        }
    } else {
        req.body.require = {
            _id: 1,
            name: 1,
            id_sector: 1,
            description: 1,
            createdAt: 1,
            status: 1,
            updatedAt: 1
        }
        req.body.limit = Infinity;
    }

    if (req.query.name) {
        await Category.aggregate([
            {
                '$project': req.body.require
            },
            {
                '$limit': req.body.limit
            }, {
                '$match': { "name": { $regex: req.query.name, $options: "$i" } }
            }
        ], function (err, categories) {
            if (err) {
                res.status(401).send(err);
            } else if (categories.length > 0) {
                res.status(200).send(categories);
            } else {
                res.status(404).send("No se han encontrado registros");
            }
        })
    } else {
        await Category.find(function (err, categories) {
            if (err) {
                res.status(401).send(err);
            } else if (categories.length > 0) {
                res.status(200).send(categories);
            } else {
                res.status(404).send("No se han encontrado registros");
            }
        })
    }
}


async function createCategory(req, res) {
    const category = new Category(req.body)

    await connect();

    const user = await User.findById(req.usuario.id);
    const type = await user.typeUser(user.id_type);

    if (type === 1) {
        await category.save(function (err) {
            if (err) {
                res.status(400).json({
                    success: false,
                    type: err.name,
                    error: err.message
                });
            } else {
                res.status(201).json({
                    success: "Categoria creada con Exito",
                    category: category
                });
            }
        });
    } else {
        res.status(401).send("Permisos insuficientes")
    }
}


async function getCategory(req, res) {
    await connect();
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            res.status(204).send("No se han encontrado registros");
        } else {
            res.status(200).send(category);
        }
    } catch (err) {
        res.status(400).send(err)
    }
}

async function updateCategory(req, res) {
    await connect();

    const user = await User.findById(req.usuario.id);
    const type = await user.typeUser(user.id_type);

    if (type === 1) {
        const category = await Category.findById(req.params.id, function (err) {
            if (err) {
                res.status(400).json({
                    error: err.name,
                    message: err.message
                })
            }
        });
        if (!category) {
            res.status(401).send("No se han encontrado el registro");
        } else {
            await Category.findByIdAndUpdate(req.params.id, {
                $set: req.body
            });
            res.status(200).send({
                message: 'Categoria Actualizada con Exito'
            });
        }
    } else {
        res.status(401).send("Permisos insuficientes")
    }
}

async function disableCategory(req, res) {
    await connect();

    const user = await User.findById(req.usuario.id);
    const type = await user.typeUser(user.id_type);

    if (type === 1) {
        const category = await Category.findById(req.params.id, function (err) {
            if (err) {
                res.status(400).json({
                    error: err.name,
                    message: err.message
                })
            }
        });
        if (!category) {
            res.status(401).send("No se han encontrado el registro");
        } else {
            await Category.findByIdAndUpdate(req.params.id, {
                $set: req.body
            });
            res.status(200).send({
                message: 'Categoria Deshabilitada con Exito'
            });
        }
    } else {
        res.status(401).send("Permisos insuficientes")
    }
}

async function disableCategories(req, res) {
    await connect();

    const user = await User.findById(req.usuario.id);
    const type = await user.typeUser(user.id_type);

    if (type === 1) {
        const category = await Category.updateMany({ "status": false }, function (err, categories) {
            if (err) {
                res.status(401).send("No se han encontrado el registros");
            } else {
                res.status(200).send({
                    message: 'Categorias Deshabilitados con Exito'
                });
            }
        });
    } else {
        res.status(401).send("Permisos insuficientes")
    }
}

// exportamos las funciones definidas
module.exports = {
    createCategory,
    showCategories,
    getCategory,
    disableCategory,
    updateCategory,
    disableCategories
}
