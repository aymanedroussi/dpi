
import mongoose from 'mongoose'

const RdvSchema = new mongoose.Schema({
    IPP: {
        type: String
    },
    patientName: {
        type: String    },
    typeRdv: {
        type: String,
    },
    day: {
        type: Date,
    },
    timing: {
        type: String,
    },
    doctor: {
        type: String,
    },
    motif: {
        type: String,
    }
})

module.exports = mongoose.models.Rdv || mongoose.model('Rdv', RdvSchema)