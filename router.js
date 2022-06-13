const express = require('express');
const router = express.Router();
const User = require('./User.js');
const crypto = require('crypto');

const Payment = require('./payments.js');


privateKey = 'sandbox_PJWkYmAbiaUeS0oMAZJzumjlPifRWcWzC1A70N2e';
publicKey = 'sandbox_i7113317942';

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
    const buff = Buffer.from(JSON.stringify({...body, publicKey }), 'utf-8');
    const base64 = buff.toString('base64');
    const signString = privateKey + body + privateKey;
    const sha1 = crypto.createHash('sha1')
    sha1.update(signString)
    const signature = sha1.digest('base64');
    // const createdPayment = await Payment.create({
    //     data: base64,
    //     signature: signature,
    //     userId: body.userId,
    //     paid: false,
    //     signature: signature,
    //     publicKey: publicKey,
    // })
    res.status(200).json({
            data: base64,
            signature: signature,
            userId: body.userId,
            paid: false,
            signature: signature,
            publicKey: publicKey,
        });
});

router.post('/paidhook', async (req, res) => {
    console.log('Paid info body - ', base64_decode(req.body.data));
    var sign = liqpay.str_to_sign(
        privateKey +
        'eyJwdWJsaWNfa2V5Ijoic2FuZGJveF9pNzExMzMxNzk0MiIsInZlcnNpb24iOiIzIiwiYWN0aW9uIjoicGF5IiwiYW1vdW50IjoiMTAwMDAwMCIsImN1cnJlbmN5IjoiVVNEIiwiZGVzY3JpcHRpb24iOiJUZXJtaW5vdmEgZG9wb21vZ2EgbmEgVmlsbHUgdiBJdGFsaWkiLCJvcmRlcl9pZCI6IlRlc3RQYXltZW50SWQ0NzUxNTQzMDkiLCJyZXN1bHRfdXJsIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwic2VydmVyX3VybCI6Imh0dHBzOi8vc3BpcmktY2FtcC11c2VyLXJlZ2lzdHJhdGlvbi5oZXJva3VhcHAuY29tL3BhaWQiLCJwcm9kdWN0X2Rlc2NyaXB0aW9uIjoiVGVybWlub3ZhIGRvcG9tb2dhIG5hIFZpbGx1IHYgSXRhbGlpIn0=' +
        privateKey
    );
    res.status(200).json({ ok: true });
});

router.delete('/:id', async ({ params }, res) => {
    const deletedUser = await User.findByIdAndDelete(params.id)
    res.status(200).json(deletedUser);
})

module.exports = router;