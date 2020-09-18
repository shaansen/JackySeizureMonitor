const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const email = profile.emails[0].value;
      const validEmails = [
        "shantanu.sengupta2008@gmail.com",
        "sunit.sengupta2007@gmail.com",
        "madseng18@gmail.com",
      ];
      if (validEmails.indexOf(email) > -1) {
        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) {
          return done(null, existingUser);
        }
        const user = await new User({ googleId: profile.id }).save();
        done(null, user);
      } else {
        return done(null, false, { message: "Incorrect username." });
      }
    }
  )
);
