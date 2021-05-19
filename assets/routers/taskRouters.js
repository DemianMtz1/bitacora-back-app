const router = require('express').Router();
const Task = require('../models/task')

router.get('/', async (req, res) => {
    const tasks = await Task.find({})
    res.status(200).json({
        error: null,
        message: 'Success',
        data: {
            tasks
        }
    })
})

router.post('/', async (req, res) => {
    let taskRequest = req.body;
    if (!taskRequest.name || !taskRequest.taskDone || !taskRequest.reply || !taskRequest.sign)
        return res.status(400).json({ error: true, message: 'Bad request' })

    try {
        taskRequest.taskDate = new Date();
        const newTask = await Task.create(taskRequest)
        res.status(200).json({
            error: null,
            message: 'Success',
            data: newTask
        })
    } catch (error) {
        console.error(error);
        res.status(400).json({
            error: null,
            message: error
        })
    }
})


module.exports = router;