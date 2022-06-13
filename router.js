const express = require('express')
const router = express.Router()
const Post = require('../SpiritCampAPI/Post.js')

router.get('/', (req, res) => {
    res.status(200).json(Post.find())
})

router.post('/', (req, res) => {
    Post.create(req.body)
    res.status(200)
})

router.delete('/:id', (req, res) => {
    Post.findByIdAndDelete(id)
})

module.exports = router;