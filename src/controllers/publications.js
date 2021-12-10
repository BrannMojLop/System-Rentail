const mongoose = require('mongoose');
const connect = require('../config/database');
const Publication = require('../models/Publication');
const User = require('../models/User');
const Product = require('../models/Product');
const Category = require('../models/Category');

async function showPublications(req, res) {
    await connect();
    if (req.query.title) {

        const search = new RegExp(`${req.query.title}`, 'i');
        await Publication.aggregate([
            {
                '$lookup': {
                    'from': 'products',
                    'localField': 'id_product',
                    'foreignField': '_id',
                    'as': 'product'
                }
            }, {
                '$match': {
                    'title': search,
                    'status': true
                }
            }

        ], function (err, publications) {
            if (err) {
                res.status(401).send(err);
            } else if (publications.length > 0) {
                res.status(200).send(publications);
            } else {
                res.status(404).send("No se han encontrado registros");
            }
        })
    } else if (req.query.sector) {

        const publications = await Publication.aggregate([
            {
                '$lookup': {
                    'from': 'products',
                    'localField': 'id_product',
                    'foreignField': '_id',
                    'as': 'product'
                },
            }, {
                '$match': {
                    'status': true
                }
            }], function (err, publications) {
                if (err) {
                    res.status(401).send(err);
                } else {
                    return publications
                }
            }
        );

        const categories = await Category.aggregate([
            {
                '$lookup': {
                    'from': 'sectors',
                    'localField': 'id_sector',
                    'foreignField': '_id',
                    'as': 'sector'
                }
            }, {
                '$match': {
                    'status': true
                }
            }], function (err, categories) {
                if (err) {
                    res.status(401).send(err);
                } else {
                    return categories
                }
            });

        function searchPublications(publications, categories) {
            const listCategories = []
            const results = [];
            categories.forEach(category => {
                if (category.sector[0]._id == req.query.sector) {
                    listCategories.push(String(category._id))
                }
            })

            for (let index = 0; index < listCategories.length; index++) {
                publications.filter(publication => {
                    if (publication.product[0].id_category == listCategories[index]) {
                        results.push(publication)
                    }
                })
            }

            if (publications.length <= 0) {
                res.status(404).send("No se han encontrado registros");
            } else {
                res.status(200).send(results);
            }
        }

        searchPublications(publications, categories)

    } else if (req.query.category) {

        await Publication.aggregate([
            {
                '$lookup': {
                    'from': 'products',
                    'localField': 'id_product',
                    'foreignField': '_id',
                    'as': 'product'
                }
            }, {
                '$match': {
                    'status': true
                }
            }], function (err, publications) {
                const search = publications.filter(publication => {
                    if (publication.product[0].id_category == req.query.category) {
                        return publication;
                    }
                })
                if (err) {
                    res.status(401).send(err);
                } else if (search.length > 0) {
                    res.status(200).send(search);
                } else {
                    res.status(404).send("No se han encontrado registros");
                }
            }
        );
    } else if (req.query.id_lessor) {

        await Publication.aggregate([
            {
                '$lookup': {
                    'from': 'products',
                    'localField': 'id_product',
                    'foreignField': '_id',
                    'as': 'product'
                }
            }], function (err, publications) {
                const search = publications.filter(publication => {
                    if (publication.product[0].id_lessor == req.query.id_lessor) {
                        return publication;
                    }
                })
                if (err) {
                    res.status(401).send(err);
                } else if (search.length > 0) {
                    res.status(200).send(search);
                } else {
                    res.status(404).send("No se han encontrado registros");
                }
            })
    } else if (req.query.min_price || req.query.max_price) {
        if (!req.query.min_price) {
            req.query.min_price = 0
        }
        if (!req.query.max_price || req.query.max_price == 0) {
            req.query.max_price = Infinity
        }
        await Publication.aggregate([
            {
                '$match': {
                    'prices': {
                        '$gte': Number(req.query.min_price),
                        '$lte': Number(req.query.max_price),
                    },
                    'status': true
                }
            }, {
                '$lookup': {
                    'from': 'products',
                    'localField': 'id_product',
                    'foreignField': '_id',
                    'as': 'product'
                }
            }
        ], function (err, publications) {
            if (err) {
                res.status(401).send(err);
            } else {
                if (err) {
                    res.status(401).send(err);
                } else if (publications.length > 0) {
                    res.status(200).send(publications);
                } else {
                    res.status(404).send("No se han encontrado registros");
                }
            }
        })
    } else {
        await Publication.aggregate([
            {
                '$lookup': {
                    'from': 'products',
                    'localField': 'id_product',
                    'foreignField': '_id',
                    'as': 'product'
                }
            }, {
                '$match': {
                    'status': true
                }
            }], function (err, publications) {
                if (err) {
                    res.send(err);
                } else {
                    res.status(200).send(publications);
                }
            }
        );
    }
}


async function createPublication(req, res) {
    const publication = new Publication(req.body)

    const updateProduct = async () => {
        await Product.updateOne({ _id: req.body.id_product }, { $set: { published: true } })
    }

    await connect();

    const user = await User.findById(req.usuario.id);
    const type = await user.typeUser(user.id_type);

    if (type === 2 || type === 4 || type === 3) {
        await publication.save(function (err) {
            if (err) {
                res.status(400).json({
                    success: false,
                    type: err.title,
                    error: err.message
                });
            } else {
                updateProduct()
                res.status(201).json({
                    success: "Publicacion creada con Exito",
                    task: "Producto Publicado",
                    Publication: publication
                });
            }
        });
    } else {
        res.status(401).send("Permisos insuficientes")
    }
}


async function getPublication(req, res) {
    await connect();
    await Publication.aggregate([
        {
            '$lookup': {
                'from': 'products',
                'localField': 'id_product',
                'foreignField': '_id',
                'as': 'product'
            }
        },
        {
            '$lookup': {
                'from': 'categories',
                'localField': 'product.id_category',
                'foreignField': '_id',
                'as': 'category'
            }
        },
        {
            '$lookup': {
                'from': 'users',
                'localField': 'product.id_lessor',
                'foreignField': '_id',
                'as': 'lessor'
            }
        },
        {
            '$match': {
                "_id": mongoose.Types.ObjectId(req.params.id)
            }
        }

    ], function (err, publications) {
        if (err) {
            res.status(401).send(err);
        } else if (publications.length > 0) {
            res.status(200).send(publications);
        } else {
            console.log(publications);
            res.status(404).send("No se han encontrado registros");
        }
    })
}

async function updatePublication(req, res) {
    await connect();

    const user = await User.findById(req.usuario.id);
    const type = await user.typeUser(user.id_type);

    if (type === 2 || type === 4 || type === 3) {
        const publication = await Publication.findById(req.params.id, function (err) {
            if (err) {
                res.status(400).json({
                    error: err.name,
                    message: err.message
                })
            }
        });
        const product = await Product.findById(publication.id_product);
        if (!publication) {
            res.status(204).send("No se han encontrado el registro");
        } else if (product.id_lessor != user.id) {
            res.status(401).send("Permisos insuficientes");
        } else {
            await Publication.findByIdAndUpdate(req.params.id, {
                $set: req.body
            });
            if (req.body.status === false) {
                await Product.updateOne({ _id: publication.id_product }, { $set: { published: false } })
            } else if (req.body.status === true) {
                await Product.updateOne({ _id: publication.id_product }, { $set: { published: true } })
            }

            res.status(200).send({
                message: 'Publicacion Actualizada con Exito'
            });
        }
    } else {
        res.status(401).send("Permisos insuficientes")
    }
}

async function disablePublication(req, res) {
    await connect();

    const user = await User.findById(req.usuario.id);
    const type = await user.typeUser(user.id_type);

    if (type === 2 || type === 4 || type === 3) {
        const publication = await Publication.findById(req.params.id, function (err) {
            if (err) {
                res.status(400).json({
                    error: err.name,
                    message: err.message
                })
            }
        });
        const product = await Product.findById(publication.id_product);
        if (!publication) {
            res.status(204).send("No se han encontrado el registro");
        } else if (product.id_lessor != user.id) {
            res.status(401).send("Permisos insuficientes");
        } else {
            await Publication.findByIdAndUpdate(req.params.id, {
                "status": false
            });
            res.status(200).send({
                message: 'Publicacion Deshabilitada con Exito'
            });
        }
    } else {
        res.status(401).send("Permisos insuficientes")
    }
}

async function disablePublications(req, res) {
    await connect();

    const user = await User.findById(req.usuario.id);
    const type = await user.typeUser(user.id_type);

    if (type === 1) {
        await Publication.updateMany({ "status": false }, function (err, publications) {
            if (err) {
                res.status(401).send("No se han encontrado el registros");
            } else {
                res.status(200).send({
                    message: 'Publicaciones Deshabilitadas con Exito'
                });
            }
        });
    } else {
        res.status(401).send("Permisos insuficientes")
    }
}

// exportamos las funciones definidas
module.exports = {
    createPublication,
    showPublications,
    getPublication,
    disablePublication,
    updatePublication,
    disablePublications
}