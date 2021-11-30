const mongoose = require('mongoose');
const connect = require('../config/database');
const uniqueValidator = require("mongoose-unique-validator");
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const secret = require('../config').secret;
const TypeUser = require('../models/TypeUser');



const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        match: [/^[a-zA-Z]+$/, "es inválido, solo puede contener letras"]
    },
    lastname: {
        type: String,
        match: [/^[a-zA-Z_ ]+$/, "es inválido, solo puede contener letras"]
    },
    email: {
        type: String,
        required: [true, 'Se requiere un email valido'],
        unique: true,
        match: [/\S+@\S+\.\S+/, "es inválido"],
    },
    username: {
        type: String,
        index: true,
        required: [true, 'Se requiere un username valido'],
        unique: true,
        match: [/^[a-zA-Z0-9]+$/, "es inválido"]
    },
    id_type: {
        type: mongoose.Types.ObjectId,
        ref: "TypeUser",
        required: [true, 'Se debe indicar un tipo de usurio']
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    },
    hash: String,
    salt: String
}, { timestamps: true })

userSchema.methods.createPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString("hex");
    this.hash = crypto
        .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
        .toString("hex");
};

userSchema.methods.validationPassword = function (password) {
    const hash = crypto
        .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
        .toString("hex");
    return this.hash === hash;
};

userSchema.methods.generateJWT = function () {
    const today = new Date();
    const exp = new Date();
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
        id: this._id,
        username: this.username,
        exp: parseInt(exp.getTime() / 1000),
    }, secret);
};

userSchema.methods.toAuthJSON = function () {
    return {
        id: this._id,
        username: this.username,
        email: this.email,
        typeUser: this.id_type,
        token: this.generateJWT()
    };
};

userSchema.methods.typeUser = async function (id_type) {
    await connect();
    const typeUser = await TypeUser.findById(id_type);
    return typeUser.type;
}

userSchema.methods.updatePassword = function (password) {
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto
        .pbkdf2Sync(password, salt, 10000, 512, "sha512")
        .toString("hex");

    return [salt, hash];
};

userSchema.methods.publicData = function () {
    return {
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        username: this.username,
        status: this.status,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    }
}

userSchema.plugin(uniqueValidator, { message: "El email ya existe" });
userSchema.plugin(uniqueValidator, { message: "El username ya existe" });
module.exports = mongoose.model("User", userSchema);
