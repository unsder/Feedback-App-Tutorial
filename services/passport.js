const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

//we will use this to put user into a cookie, so the client accepts the user's authentication
passport.serializeUser((user, done) => {
    //user.id is the id created by Mongo DB after a user authenticates
    done(null, user.id);
});

//we will use this when we send the cookie back to authenticate every time the client makes a request from the server
passport.deserializeUser((id, done) => {
    //findByID 
    User.findById(id)
        .then(user => {
            done(null, user);
        });
});

// This does 2 things: first, it creates a new passport object to authenticate with Google.  Then, after authentication, it either creates new user or logs existing user.
passport.use(
    new GoogleStrategy(
        {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
        }, 
        (accessToken, refreshToken, profile, done) => {
            //look through MongoDB to query if a google ID already exists
            User.findOne({ googleId: profile.id }).then(existingUser => {
                if (existingUser) {
                    // we already have a record with the profile ID
                    done(null, existingUser);
                } else {
                    // we don't have a record with the profile ID, make a new one
                    new User({ googleId: profile.id }).save().then(user => done(null, user));
                }
            });
        }
    )
);