const router = require('express').Router();
const Member = require('../models/members');

router.get('/', async (req, res) => {
    const members = await Member.find({});

    res.status(200).json({
        error: null,
        message: 'Success',
        data: {
            members
        }
    })
})

router.post('/', async (req, res) => {
    const memberReq = req.body;
    if (!memberReq.name || !memberReq.sign)
        return res.status(400).json({ error: true, message: 'Bad request' })

    try {
        const newMember = await Member.create(memberReq)

        res.status(200).json({
            error: null,
            message: 'Success',
            data: newMember

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