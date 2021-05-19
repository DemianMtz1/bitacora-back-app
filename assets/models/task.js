const mongoose = require('mongoose');

// schema
const taskSchema = mongoose.Schema({
    taskDate: {
        type: String,
        required: true,
        minLength: 2
    },
    name: {
        type: String,
        required: true,
        minLength: 2
    },
    taskDone: {
        type: String,
        required: true,
        minLength: 5
    },
    reply: {
        type: String,
        required: true
    },
    sign: {
        type: String,
        required: true
    }
})

// models
const Task = new mongoose.model('tasks', taskSchema)

module.exports = Task;