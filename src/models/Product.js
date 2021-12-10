const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Se debe indicar un titulo para el producto']
    },
    description: {
        type: String
    },
    image: {
        type: String,
        required: [true, 'El producto debe tener una imagen']
    },
    id_category: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
        required: [true, 'Se debe asignar una categoria al producto']
    },
    id_lessor: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, 'Se debe asignar un usuario tipo: Arrendatario al producto']
    },
    published: {
        type: Boolean,
        required: true,
        default: false
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    }
}, { timestamps: true })

module.exports = mongoose.model("Product", productSchema);