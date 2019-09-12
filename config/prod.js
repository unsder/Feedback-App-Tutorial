// prod.js - production keys here, do commit this

module.exports = {
    googleClientID: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    mongoURI: process.env.MONGO_URI,
    // this key makes it so that it's impossible for a user to 'spoof' their cookie, and act as though they're someone else
    cookieKey: process.env.COOKIE_KEY,
    stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    stripeSecretKey: process.env.STRIPE_SECRET_KEY
};