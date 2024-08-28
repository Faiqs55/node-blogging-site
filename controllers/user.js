const { uploader } = require('../middlewares/cloudinary');
const UserModel = require('../models/user');
const jwt = require('jsonwebtoken');

const renderSignUp = (req,res)=> {
    res.render('signup', {error: null});
}

const userSignUp = async(req, res) => {
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
            res.render('signup', {msg: "Email Already in use"});
        }
    }
}

const renderSignin = (req,res)=>{
       res.render('signin');
}

const userLogin = async (req, res) => {
    let {email, password} = req.body;
    let user = await UserModel.userLogin(email, password);
    if(!user.error){
        const token = jwt.sign({id: user._id}, process.env.LOGIN_SECRET);
        res.cookie('userAuth', token).redirect('/');
    }else{
        res.render('signin', {error: user.error})
    }
}

const userLogout = (req,res)=>{
    res.clearCookie('userAuth').redirect('/user/login');
}

module.exports = {
    renderSignUp,
    userSignUp,
    renderSignin,
    userLogin,
    userLogout
}