const express = require('express');
const router = express.Router();
const Post = require('./Post.js');

var LiqPay = require('liqpay');

router.get('/', async (req, res) => {
    const databaseResult = await Post.find({});
    res.status(200).json(databaseResult); 
})

router.post('/', async (req, res) => {
    const createdUser = await Post.create(req.body)
    res.status(200).json(createdUser);
})

router.post('/paid', async (req, res) => {
    var sign = LiqPay.str_to_sign(
        'sandbox_PJWkYmAbiaUeS0oMAZJzumjlPifRWcWzC1A70N2e' +
        req.data +
        'sandbox_i7113317942'
    );
    console.log('Signature from server - ', req.body.signature);
    console.log('Recovered - ', sign);
    console.log('Paid info body - ', base64_decode(req.body.data));
    res.status(200).json({ ok: true });
});

router.delete('/:id', async ({ params }, res) => {
    const deletedUser = await Post.findByIdAndDelete(params.id)
    res.status(200).json(deletedUser);
})

module.exports = router;