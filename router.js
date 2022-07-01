const express = require('express');
const router = express.Router();
const User = require('./User.js');
const crypto = require('crypto');

function preparePeymentData(userId, userName) {
    const payData = {
        action: "pay",
        amount: "1500",
        currency: "UAH",
        description: "Oplata za Spirit Camp 2022 Lito - " + userName,
        order_id: userId,
        product_description: "Avans",
        result_url: "https://spiri-camp-user-registration.herokuapp.com/result",
        server_url: "https://spiri-camp-user-registration.herokuapp.com/paid",
        version: "3",
    }
    const data = JSON.stringify({...payData, public_key: publicKey });
    const buff = Buffer.from(data, 'utf-8');
    const base64 = buff.toString('base64');
    const signString = privateKey + base64 + privateKey;

    const sha1 = crypto.createHash('sha1')
    sha1.update(signString)
    const signature = sha1.digest('base64');
    return { signature, paymentDataBase64: base64 };
}


const privateKey = 'sandbox_PJWkYmAbiaUeS0oMAZJzumjlPifRWcWzC1A70N2e';
const publicKey = 'sandbox_i7113317942';

var LiqPay = require('./liqpay.js');
var liqpay = new LiqPay(publicKey, privateKey);

router.get('/', async (req, res) => {
    const databaseResult = await User.find({});
    res.status(200).json(databaseResult); 
})

router.post('/', async (req, res) => {
    const createdUser = await User.create({ ...req.body, paid: false })
    const payData = preparePeymentData(
        createdUser._id,
        `${createdUser.name} ${createdUser.surname} ${createdUser.fatherName}`
    );
    const userId = createdUser.id;
    delete createdUser.id;
    const userWithPaymentData = {
        ...createdUser,
        paymentDataBase64: payData.paymentDataBase64,
        signature: payData.signature,
    };
    await User.findByIdAndUpdate(userId, userWithPaymentData);
    res.status(200).json(userWithPaymentData);
});

router.post('/paid', async (req, res) => {
    const decoded = Buffer.from(req.body.data, 'base64').toString('utf8');
    var sign = liqpay.str_to_sign(
        privateKey +
        req.body.data +
        privateKey
    );
    console.log('Paid method workds - ', decoded);
    await User.findByIdAndUpdate(decoded.order_id, { paid: true });
    if (req.body.signature === sign) {
        res.status(200).json({ ok: true, sign });
    } else {
      res.status(300).json({ ok: false });
    }
});

router.post('/result', (req, res) => {
    console.log('Result URL - ', req.body);
    res.redirect('http://localhost:3000/about');
});

router.delete('/:id', async ({ params }, res) => {
    const deletedUser = await User.findByIdAndDelete(params.id)
    res.status(200).json(deletedUser);
})

module.exports = router;