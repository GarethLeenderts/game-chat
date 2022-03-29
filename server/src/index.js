// if (process.env.NODE_ENV !== 'production') {
//     require('dotenv').config();
// }
require('dotenv').config();

const express = require('express');
const cors = require('cors');
// const mongoose = require('mongoose');

// const AuthRouter = require('./api/v1/routes/auth.js');
// const UserRouter = require('./api/v1/routes/users');



const app = express();
const router = express.Router();


// ======= CORS MIDDLEWARE =======
const corsOptions = {
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,POST,PATCH,DELETE"
}
app.use(cors(corsOptions))

// ======= BODY-PARSING MIDDLEWARE =======
app.use(express.urlencoded({ extended: false }));

// ======= ROUTER MIDDLEWARE =======
// router.use('/auth', authRoutes);
// router.use('/:username', protectRoute, UserRouter);
// router.use('/game', gameRoutes);


// ------- Connect to MongoDB -------
// const MONGO_CONNECTION_URL = process.env.MONGO_CONNECTION_URL
// mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })

PORT = 5000 || process.env.PORT;
app.listen(PORT, console.log(`Server listenting on port ${PORT}`));