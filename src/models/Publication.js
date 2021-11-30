const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const publicationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Se debe indicar un titulo para la publicacion']
    },
    id_product: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: [true, 'Se debe indicar un ID_Producto para la publicacion'],
        unique: true
    },
    prices: {
        type: Array,
        required: [true, 'Es necesario indicar los precios de la publicacion']
    },
    periods: {
        type: Array,
        required: [true, 'Es necesario indicar los periodos de la publicacion']
    },
    amount: {
        type: Number,
        required: [true, 'Se deben indicar las existencias disponibles'],
        min: [1, 'Solo se pueden existencias igual o mayores a 1']
    },
    location: {
        type: String
    },
    max_distance: {
        type: Number,
        min: [1, 'Solo se pueden distancias igual o mayores a 1km']
    },
    finished_at: {
        type: Date
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    }
}, { timestamps: true })

publicationSchema.plugin(uniqueValidator, { message: "El producto ya se encuentra publicado" });
module.exports = mongoose.model("Publication", publicationSchema);