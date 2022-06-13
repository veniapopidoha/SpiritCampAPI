const express = require('express')
const router = express.Router()
const Post = require('./Post.js')

router.get('/', async (req, res) => {
    const databaseResult = await Post.find({});
    res.status(200).json(databaseResult); 
})

router.post('/', async (req, res) => {
    const createdUser = await Post.create(req.body)
    res.status(200).json(createdUser);
})

router.post('/paid', async (req, res) => {
    console.log('Paid info paramsss - ', req.headers);
    res.status(200).json(req.params);
});

router.delete('/:id', async ({ params }, res) => {
    const deletedUser = await Post.findByIdAndDelete(params.id)
    res.status(200).json(deletedUser);
})

module.exports = router;