const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const GOOGLE_CLIENT_ID = '559583488558-ra5aqaneva5catns3eturk87gk9t286u.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:9000/auth/google/callback",
},
function(request, accessToken, refreshToken, profile, done) {
  request.user = profile;
  return done(null, profile);
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});