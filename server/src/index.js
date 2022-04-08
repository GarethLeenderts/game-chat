// if (process.env.NODE_ENV !== 'production') {
//     require('dotenv').config();
// }
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoSessionStore = require('connect-mongo');

const AuthRouter = require('./api/v1/routes/auth.js');
const UserRouter = require('./api/v1/routes/users');



const app = express();
const router = express.Router();


// ======= CORS MIDDLEWARE =======
const corsOptions = {
    origin: [
        "http://localhost:3000", 
        "https://localhost:3000", 
        "https://oauth2.googleapis.com",
        "https://www.googleapis.com",
        "*"],
    methods: "GET,HEAD,PUT,POST,PATCH,DELETE"
}
app.use(cors(corsOptions))

// ======= BODY-PARSING MIDDLEWARE =======
app.use(express.urlencoded({ extended: false }));
// ======= COOKIE-PARSING MIDDLEWARE =======
app.use(cookieParser());

// ======= SESSION MIDDLEWARE =======
const mongoStoreOptions = {
    // mongoUrl: 'mongodb://localhost/test-app',
    mongoUrl: process.env.MONGO_CONNECTION_URL_SessionsDB,
    collectionName: 'authentication-sessions',
    ttl: 14 * 24 * 60 * 60, // = 14 days. Default
    autoRemove: 'native', // Default
    autoRemoveInterval: 10, // In minutes. Default
    crypto: {
        secret: process.env.MONGO_SESSION_STORE_SECRET,
    },
};
const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false, //don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    store: MongoSessionStore.create(mongoStoreOptions),
    cookie: { 
        maxAge: 1000 * 60 * 60 * 24 * 14, // = 14 days in milliseconds
        httpOnly: true,
        secure: false, // true is recommended for production, but requires https to be enabled
    }
}
app.use(session(sessionOptions));


// ======= ROUTER MIDDLEWARE =======
router.use('/auth', AuthRouter);
router.use('/users', UserRouter);
// router.use('/:username', protectRoute, UserRouter);
// router.use('/game', gameRoutes);

app.use(router);


// ------- Connect to MongoDB -------
const MONGO_CONNECTION_URL = process.env.MONGO_CONNECTION_URL_UsersDB;
const mongoConnection = mongoose.connect(MONGO_CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true });

PORT = 5000 || process.env.PORT;
app.listen(PORT, console.log(`Server listening on port ${PORT}`));