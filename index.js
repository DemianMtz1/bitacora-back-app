const express = require('express');
const app = express();

const mongoose = require('mongoose');
const taskRouter = require('./assets/routes/taskRouters');
const memberRouter = require('./assets/routes/memberRouters');

require('dotenv').config();

const PORT = 8080 || process.env.PORT;
const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}
`
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('DB connected')
})
.catch(err => {
    console.error(err)
})

// JSON request 
app.use(express.json());
app.use('/members', memberRouter);
app.use('/tasks', taskRouter);

app.get('/', async (req, res) => {
    res.json({
        error: null,
        message: 'Default endpoint'
    })
})

app.listen(PORT, ()=> {
    console.log(`Listening server on port ${PORT}`)
})