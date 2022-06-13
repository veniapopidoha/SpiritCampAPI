const express = require('express');
const router = express.Router();
const User = require('./User.js');
const crypto = require('crypto');

const Payment = require('./payments.js');


const privateKey = 'sandbox_PJWkYmAbiaUeS0oMAZJzumjlPifRWcWzC1A70N2e';
const publicKey = 'sandbox_i7113317942';

var LiqPay = require('./liqpay.js');
var liqpay = new LiqPay(publicKey, privateKey);

router.get('/', async (req, res) => {
    const databaseResult = await User.find({});
    res.status(200).json(databaseResult); 
})

router.post('/', async (req, res) => {
    const createdUser = await User.create(req.body)
    res.status(200).json(createdUser);
})


router.post('/beginPay', async ({ body }, res) => {
    console.log('body - ', body);
    const data = JSON.stringify({...body, public_key: publicKey });
    const buff = Buffer.from(data, 'utf-8');
    const base64 = buff.toString('base64');
    const signString = privateKey + base64 + privateKey;

    const sha1 = crypto.createHash('sha1')
    sha1.update(signString)
    const signature = sha1.digest('base64');
    // const createdPayment = await Payment.create({
    //     data: data,
    //     userId: body.userId,
    //     paid: false,
    // })
    res.status(200).json({
        data: base64,
        userId: body.userId,
        paid: false,
        signature: signature,
    });
});

router.post('/paid', async (req, res) => {
    const decoded = Buffer.from(req.body.data, 'base64').toString('utf8');
    console.log('decoded Data - , ', decoded)
    var sign = liqpay.str_to_sign(
        privateKey +
        req.body.data +
        privateKey
    );
    if (req.body.signature === sign) {
        res.status(200).json({ ok: true, sign });
    } else {
      res.status(300);
    }
});

router.delete('/:id', async ({ params }, res) => {
    const deletedUser = await User.findByIdAndDelete(params.id)
    res.status(200).json(deletedUser);
})

module.exports = router;