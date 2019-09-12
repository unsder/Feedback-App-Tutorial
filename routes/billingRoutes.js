const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');


// server receives token from Stripe after checkout.js, then sends it back to finalize authentication
module.exports = app => {
    app.post('/api/stripe', requireLogin, async (req, res) => {
        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: '$5 for credits with the Feedback App',
            source: req.body.id
        });

        //add 5 credits to the user
        req.user.credits += 5;
        const user = await req.user.save();

        res.send(user);
    });
};