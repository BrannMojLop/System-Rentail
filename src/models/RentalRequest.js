const mongoose = require('mongoose');

const rentalRequestSchema = new mongoose.Schema({
    id_lessee: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, 'Se debe indicar un ID_Usuario tipo Arrendatario']
    },
    id_lessor: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, 'Se debe indicar un ID_Usuario tipo Arrendador']
    },
    id_publication: {
        type: mongoose.Types.ObjectId,
        ref: "Publication",
        required: [true, 'Se debe indicar un ID_Publicacion']
    },
    contract: {
        type: Object,
        required: [true, 'Es necesario indicar el un objeto con el contrato de la solicitud']
    },
    answer: {
        type: Object,
        required: true,
        default: {
            "status": "En Espera",
            "ref": 1
        }
    }
}, { timestamps: true })

module.exports = mongoose.model("RentalRequest", rentalRequestSchema);