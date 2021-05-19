const mongoose = require('mongoose');

// definir schema
const memberSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    sign: {
        type: String,
        required: true
    }
})
// definir modelo
const Member = new mongoose.model('members', memberSchema);

// exportar
module.exports = Member;