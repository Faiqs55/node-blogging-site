// IMPORT PACKAGE IMPORTS 
const express = require('express');
const path = require('path');
const connectToDB = require('./conn');
const userRouter = require('./routes/user');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const { checkAuth, checkLogin } = require('./middlewares/auth');
const UserModel = require('./models/user');

// VARIABLES AND CALLS 
const app = express();
const PORT = 5000;
connectToDB('mongodb://127.0.0.1:27017/blogify');

// MIDDLEWARES 
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));
app.use(express.static(path.join(__dirname, 'public')));
dotenv.config();

// ROUTES 
app.get('/', checkAuth , async (req, res) => {
    let user = await UserModel.findById(req.userID);
    res.render('home', {user});
});
app.use('/user', userRouter);

// LISTENING 
app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));