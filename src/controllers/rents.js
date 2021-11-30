const connect = require('../config/database');
const Rent = require('../models/Rent');
const RentalRequest = require('../models/RentalRequest');
const Publication = require('../models/Publication');
const User = require('../models/User');
const Product = require('../models/Product');


async function showRents(req, res) {
    await connect();
    if (req.query.id_lessee) {
        await Rent.aggregate([
            {
                '$lookup': {
                    'from': 'rentalrequests',
                    'localField': 'id_rentalRequest',
                    'foreignField': '_id',
                    'as': 'request'
                }
            }, { '$unwind': '$request' }
        ], function (err, rents) {
            if (err) {
                res.status(401).res.send(err);
            }
            else if (rents.length === 0) {
                res.send("No se han encontrado registros");
            } else {
                const result = [];
                rents.forEach(rent => {
                    if (rent.request.id_lessee == req.query.id_lessee) {
                        result.push(rent)
                    }
                });
                res.status(200).send(result);
            }
        }
        )
    } else if (req.query.id_lessor) {
        await Rent.aggregate([
            {
                '$lookup': {
                    'from': 'rentalrequests',
                    'localField': 'id_rentalRequest',
                    'foreignField': '_id',
                    'as': 'request'
                }
            }, { '$unwind': '$request' }
        ], function (err, rents) {
            if (err) {
                res.status(401).res.send(err);
            }
            else if (rents.length === 0) {
                res.send("No se han encontrado registros");
            } else {
                const result = [];
                rents.forEach(rent => {
                    if (rent.request.id_lessor == req.query.id_lessor) {
                        result.push(rent)
                    }
                });
                res.status(200).send(result);
            }
        }
        )
    } else {
        await Rent.aggregate([
            {
                '$lookup': {
                    'from': 'rentalrequests',
                    'localField': 'id_rentalRequest',
                    'foreignField': '_id',
                    'as': 'request'
                }
            }, { '$unwind': '$request' }], function (err, rents) {
                if (err) {
                    res.status(401).res.send(err);
                }
                else if (rents.length === 0) {
                    res.send("No se han encontrado registros");
                } else {
                    res.status(200).send(rents);
                }
            }
        )
    }
}

async function createRent(req, res) {
    const rent = new Rent(req.body)

    await connect();

    const user = await User.findById(req.usuario.id);
    const type = await user.typeUser(user.id_type);

    if (type === 2 || type === 4 || type === 3) {
        const rentalRequest = await RentalRequest.findById(rent.id_rentalRequest, function (err) {
            if (err) {
                res.status(400).json({
                    error: err.name,
                    message: err.message
                })
            }
        });
        const publication = await Publication.findById(rentalRequest.id_publication, function (err) {
            if (err) {
                res.status(400).json({
                    error: err.name,
                    message: err.message
                })
            }
        });
        const product = await Product.findById(publication.id_product, function (err) {
            if (err) {
                res.status(400).json({
                    error: err.name,
                    message: err.message
                })
            }
        });

        if (product.id_lessor != user.id) {
            res.status(401).send("Permisos insuficientes");
        } else {
            await rent.save(async function (err) {
                if (err) {
                    res.status(400).json({
                        success: false,
                        type: err.title,
                        error: err.message
                    });
                } else {
                    const rentalRequest = await RentalRequest.findById(rent.id_rentalRequest);
                    if (!rentalRequest) {
                        res.status(401).send("No se ha encontrado el registro de la solicitud de renta");
                    } else {
                        await RentalRequest.findByIdAndUpdate(rent.id_rentalRequest, {
                            answer: {
                                "status": "Confirmada",
                                "ref": 2
                            }
                        });
                        res.status(200).json({
                            message: 'Solicitud de Renta Actualizada con Exito',
                            success: "Renta creada con Exito",
                            RentalRequest: rentalRequest.answer,
                            Rent: rent
                        });
                    }
                }
            });
        }
    } else {
        res.status(401).send("Permisos insuficientes")
    }
}

async function getRent(req, res) {
    await connect();
    try {
        const rent = await Rent.findById(req.params.id);
        if (!rent) {
            res.status(204).send("No se han encontrado registros");
        } else {
            res.status(200).send(rent);
        }
    } catch (err) {
        res.status(400).send(err)
    }
}

async function updateRent(req, res) {
    await connect();

    const user = await User.findById(req.usuario.id);
    const type = await user.typeUser(user.id_type);

    if (type === 2 || type === 4 || type === 3) {
        const rent = await Rent.findById(req.params.id, function (err) {
            if (err) {
                res.status(400).json({
                    error: err.name,
                    message: err.message
                })
            }
        });
        const rentalRequest = await RentalRequest.findById(rent.id_rentalRequest, function (err) {
            if (err) {
                res.status(400).json({
                    error: err.name,
                    message: err.message
                })
            }
        });
        const publication = await Publication.findById(rentalRequest.id_publication, function (err) {
            if (err) {
                res.status(400).json({
                    error: err.name,
                    message: err.message
                })
            }
        });
        const product = await Product.findById(publication.id_product, function (err) {
            if (err) {
                res.status(400).json({
                    error: err.name,
                    message: err.message
                })
            }
        });

        if (!rent) {
            res.status(401).send("No se han encontrado el registro");
        } else if (product.id_lessor != user.id) {
            res.status(401).send("Permisos insuficientes");
        } else {
            if (req.params.update == 2) {
                await Rent.findByIdAndUpdate(req.params.id, {
                    status: {
                        "status": "Finalizada",
                        "ref": 2
                    }
                });
            } else if (req.params.update == 3) {
                await Rent.findByIdAndUpdate(req.params.id, {
                    status: {
                        "status": "Cancelada",
                        "ref": 2
                    }
                });
            } else if (req.params.update == 4) {
                await Rent.findByIdAndUpdate(req.params.id, {
                    payment: true
                });
            }
            res.status(200).json({
                message: 'Solicitud de Renta Actualizada con Exito'
            });
        }
    } else {
        res.status(401).send("Permisos insuficientes")
    }
}

// exportamos las funciones definidas
module.exports = {
    createRent,
    showRents,
    getRent,
    updateRent
}