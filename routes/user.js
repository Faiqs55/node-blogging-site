const express = require('express');
const { renderSignUp } = require('../controllers/user');
const userRouter = express.Router();
const upload = require('../middlewares/multer');
const { uploader } = require('../middlewares/cloudinary');
const UserModel = require('../models/user');

userRouter.get('/signup', renderSignUp);
userRouter.post('/signup', upload.single('profileImg') ,async(req, res) => {
    let data = req.body;
    if(req.file){
        let result = await uploader.upload(req.file.path);
        data = {
        ...data,
        profileImg: result.secure_url
    };
    }
    
    try {
        let user = await UserModel.create(data);
        console.log(user);
        res.redirect('/');
    } catch (error) {
        if(error.code == 11000){
            res.render('signup', {e: 'Email Already Exists'});
        }
    }
});

module.exports = userRouter;