const connect = require('../config/database');
const Sector = require('../models/Sector');
const User = require('../models/User');


async function showSectors(req, res) {
    try {
        await connect();

        if (req.body.require || req.body.limit) {
            if (!req.body.limit) {
                req.body.limit = Infinity;
            } else if (!req.body.require) {
                req.body.require = {
                    _id: 1,
                    name: 1,
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
                description: 1,
                createdAt: 1,
                status: 1,
                updatedAt: 1
            }
            req.body.limit = Infinity;
        }

        if (req.query.name) {
            await Sector.aggregate([
                {
                    '$project': req.body.require
                },
                {
                    '$limit': req.body.limit
                }, {
                    '$match': { "name": { $regex: req.query.name, $options: "$i" } }
                }
            ], function (err, sectors) {
                if (err) {
                    res.status(401).send(err);
                } else if (sectors.length > 0) {
                    res.status(200).send(sectors);
                } else {
                    res.status(204).send("No se han encontrado registros");
                }
            })
        } else {
            await Sector.find(function (err, sectors) {
                console.log(err);
                if (err) {
                    res.status(401).send(err);
                } else if (sectors.length > 0) {
                    res.status(200).send(sectors);
                } else {
                    res.status(204).send("No se han encontrado registros");
                }
            })
        }
    } catch (err) {
        res.send('err')
    }
}


async function createSector(req, res) {
    const sector = new Sector(req.body)

    await connect();

    const user = await User.findById(req.usuario.id);
    const type = await user.typeUser(user.id_type);

    if (type === 1) {
        await sector.save(function (err) {
            if (err) {
                res.status(400).json({
                    success: false,
                    type: err.name,
                    error: err.message
                });
            } else {
                res.status(201).json({
                    success: "Sector creado con Exito",
                    sector: sector
                });
            }
        });
    } else {
        res.status(401).send("Permisos insuficientes")
    }
}


async function getSector(req, res) {
    await connect();
    try {
        const sector = await Sector.findById(req.params.id);
        if (!sector) {
            res.status(204).send("No se han encontrado registros");
        } else {
            res.status(200).send(sector);
        }
    } catch (err) {
        res.status(400).send(err)
    }
}

async function updateSector(req, res) {
    await connect();

    const user = await User.findById(req.usuario.id);
    const type = await user.typeUser(user.id_type);

    if (type === 1) {
        const sector = await Sector.findById(req.params.id, function (err) {
            if (err) {
                res.status(400).json({
                    error: err.name,
                    message: err.message
                })
            }
        });

        if (!sector) {
            res.status(401).send("No se han encontrado el registro");
        } else {
            await Sector.findByIdAndUpdate(req.params.id, {
                $set: req.body
            });
            res.status(200).send({
                message: 'Sector Actualizado con Exito'
            });
        }
    } else {
        res.status(401).send("Permisos insuficientes")
    }
}



async function disableSector(req, res) {
    await connect();

    const user = await User.findById(req.usuario.id);
    const type = await user.typeUser(user.id_type);

    if (type === 1) {
        const sector = await Sector.findById(req.params.id, function (err) {
            if (err) {
                res.status(400).json({
                    error: err.name,
                    message: err.message
                })
            }
        });
        if (!sector) {
            res.status(204).send("No se han encontrado el registro");
        } else {
            await Sector.findByIdAndUpdate(req.params.id, {
                "status": false
            });
            res.status(200).send({
                message: 'Sector Deshabilitado con Exito'
            });
        }
    } else {
        res.status(401).send("Permisos insuficientes")
    }
}

async function disableSectors(req, res) {
    await connect();

    const user = await User.findById(req.usuario.id);
    const type = await user.typeUser(user.id_type);

    if (type === 1) {
        await Sector.updateMany({ "status": false }, function (err, sectors) {
            if (err) {
                res.status(204).send("No se han encontrado el registros");
            } else {
                res.status(200).send({
                    message: 'Sectores Deshabilitados con Exito'
                });
            }
        });
    } else {
        res.status(401).send("Permisos insuficientes")
    }
}


// exportamos las funciones definidas
module.exports = {
    createSector,
    showSectors,
    getSector,
    disableSector,
    updateSector,
    disableSectors
}
