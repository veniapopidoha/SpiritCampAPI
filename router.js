const express = require('express')
const router = express.Router()
const Post = require('../SpiritCampAPI/Post.js')

router.get('/', async (req, res) => {
    const databaseResult = await Post.find({});
    res.status(200).json(databaseResult); 
})

router.post('/', async (req, res) => {
    await Post.create(req.body)
    res.status(200);
})

router.delete('/:id', async (req, res) => {
    await Post.findByIdAndDelete(id)
    res.status(200);
})

module.exports = router;