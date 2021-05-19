const router = require('express').Router();
const Task = require('../models/task')

router.get('/', async (req, res)=> {
    const tasks = await Task.find({})
    res.status(200).json({
        error: null,
        message: 'Success',
        data: {
            tasks
        }
    })
})


module.exports = router;