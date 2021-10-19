import express from 'express';
import session from 'express-session'
import passport from 'passport'
import cors from 'cors'
import SpotifyStrategy from 'passport-spotify'
import { spotifyRouter } from './routes/spotifyRouter';
import { spotifyUser, UserData } from './types/SpotifyTypes';
import { checkAuth, refreshToken } from './services/spotifyService';
import { SPOTIFY_CALLBACK, SPOTIFY_CLIENTID, SPOTIFY_SECRET } from './config';
const SpotifyStrateg = SpotifyStrategy.Strategy;
console.log(SPOTIFY_CLIENTID)
const app = express();
const port = 3000;
const authCallbackPath = '/callback';
// const strategy = SpotifyStrategy.strategy;
app.use(cors({credentials: true, origin: 'http://localhost:3001'}))
passport.serializeUser(function (user, done) {
  console.log("serializeuser")
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  console.log("deserialize")
  done(null, obj);
});


app.use(
  session({ secret: 'keyboard cat', resave: true, saveUninitialized: true })
);
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

/* SPOTIFY_CLIENTID
SPOTIFY_SECRET */
passport.use(
  new SpotifyStrateg(
    {
      clientID: SPOTIFY_CLIENTID,
      clientSecret: SPOTIFY_SECRET,
      callbackURL: SPOTIFY_CALLBACK,
    },
    (accessToken, refreshToken, expires_in, profile, done) => {
      // asynchronous verification, for effect...
      process.nextTick(() => {
        // To keep the example simple, the user's spotify profile is returned to
        // represent the logged-in user. In a typical application, you would want
        // to associate the spotify account with a user record in your database,
        // and return that user instead.
   
        const user: UserData = {
          user: profile,
          accessToken,
          refreshToken,
          expires_in
        }
        return done(null, user);
      });
    }
  )
);

app.get(
  '/auth/spotify',
  passport.authenticate('spotify', {
    scope: ["ugc-image-upload",
      "playlist-modify-private",
      "playlist-read-private",
      "playlist-modify-public",
      "playlist-read-collaborative",
      "user-read-private",
      "user-read-email",
      "user-read-playback-state",
      "user-modify-playback-state",
      "user-read-currently-playing",
      "user-library-modify",
      "user-library-read",
      "user-read-playback-position",
      "user-read-recently-played",
      "user-top-read",
      "app-remote-control",
      "streaming",
      "user-follow-modify",
      "user-follow-read"],
    showDialog: true,
    
  })
);

app.get(
  authCallbackPath,
  passport.authenticate('spotify', { failureRedirect: '/login' }),
  (req, res) => {
    //@ts-ignore
    console.log(req.user)
    //@ts-ignore
    res.redirect(`http://localhost:3001/login?accessToken=${req.user.accessToken}&refreshToken=${req.user.refreshToken}&expires_in=${req.user.expires_in}`)

    // 
  }
);



app.get('/logout', function (req, res) {
  //@ts-ignore
  req.logout();
  res.redirect('/');
});


const ensureAuthenticated = async (req, res, next) => {
 console.log("ensureAuthenticated")
  try {
   // console.log(req.user)
   if(req.user) {
     console.log(req.user.refreshToken)
     await checkAuth(req.user.accessToken);
     return next();
   } else {

    res.sendStatus(401)
   }



  } catch (e) {
    console.log(e)
   res.sendStatus(401)
  }
}


const printAccesstoken = async (req, res, next) => {
  console.log("################################################")
  if(req.user) console.log(req.user.accessToken)
  console.log("################################################")
next()
}
app.use(printAccesstoken)
app.post('/refresh', async (req, res) => {
  console.log("app.post('/refresh', async (req, res) => {")
    //@ts-ignore
  if(req.user.refreshToken) {
  //@ts-ignore
  const resp = await refreshToken(req.user.refreshToken);
  console.log(resp)
res.json(resp);
  } else {
    res.send(403)
  }

});





app.use("/api", ensureAuthenticated, spotifyRouter)
//@ts-ignore
app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${port}`);
});