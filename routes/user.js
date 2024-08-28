const express = require('express');
const { renderSignUp, userSignUp, renderSignin, userLogin, userLogout } = require('../controllers/user');
const userRouter = express.Router();
const upload = require('../middlewares/multer');
const { checkLogin } = require('../middlewares/auth');

userRouter.get('/signup', checkLogin,renderSignUp);
userRouter.post('/signup', upload.single('profileImg'), userSignUp);

userRouter.get('/login', checkLogin, renderSignin)
userRouter.post('/login', userLogin)

userRouter.get('/logout', userLogout)

module.exports = userRouter;