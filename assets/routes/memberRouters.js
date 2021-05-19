const router = require('express').Router();
const Member = require('../models/members');

router.get('/', async(req,res)=> {
    const members = await Member.find({});

    res.status(200).json({
        error: null,
        message: 'Success',
        data: {
            members
        }
    })
})

module.exports = router;