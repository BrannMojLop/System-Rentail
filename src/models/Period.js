const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const periodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        match: [/^[a-zA-Z0-9_ ]+$/, "es inválido, solo se aceptan letras"]
    },
    days: {
        type: Number,
        required: [true, 'Se deben indicar los dias del periodo'],
        min: [1, 'Solo se pueden indicar dias igual o mayores a 1']
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    }
}, { timestamps: true })

periodSchema.plugin(uniqueValidator, { message: "El periodo ya existe" });
module.exports = mongoose.model("Period", periodSchema);