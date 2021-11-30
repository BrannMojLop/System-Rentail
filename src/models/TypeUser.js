const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const typeUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        match: [/^[a-zA-Z0-9_ ]+$/, "es inválido, no puede contener caracteres especiales"]
    },
    type: {
        type: Number,
        required: [true, 'Se debe indicar un tipo de usuario'],
        unique: true,
        min: [1, 'Solo se pueden indicar tipos igual o mayores a 1']
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    }
}, { timestamps: true })

typeUserSchema.plugin(uniqueValidator, { message: "El tipo de usuario ya existe" });
module.exports = mongoose.model("TypeUser", typeUserSchema);