const express = require('express');
const app = express();

const mongoose = require('mongoose');
const taskRouter = require('./assets/routers/taskRouters');
const memberRouter = require('./assets/routers/memberRouters');
const Task = require('./assets/models/task');

const cron = require('node-cron');
const fs = require('fs');

require('dotenv').config();

const PORT = 8080 || process.env.PORT;
const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('DB connected')
})
.catch(err => {
    console.error(err)
});

// JSON request
app.use(express.json());
app.use('/members', memberRouter);
app.use('/tasks', taskRouter);

const removeDocuments = cron.schedule('12 55 * * * Wed', async ()=> {
    try {
        await Task.deleteMany({});
        const message = 'Tareas eliminadas del dia: ' + new Date();
        await fs.promises.writeFile('logs.log', message, 'utf8')

    } catch (error) {
        console.error(error)
    }
})

removeDocuments.start();

app.get('/', async (req, res) => {
    res.json({
        error: null,
        message: 'Default endpoint'
    })
});

app.listen(PORT, ()=> {
    console.log(`Listening server on port ${PORT}`)
});