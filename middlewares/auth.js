const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');


async function checkAuth(req, res, next){
    let token = req?.cookies?.userAuth;
    if(token){
        let userID = jwt.verify(token, process.env.LOGIN_SECRET);
        let user = await UserModel.findById(userID.id);
        if(user){
            req.userID = userID.id;
            next();
        }else{
            res.redirect('/user/login');
        }
    }else{
        res.redirect('/user/login')
    }

}

function checkLogin(req, res, next){
    let token = req.cookies.userAuth;
    if(token){
        res.redirect('/');
    }
    next();
}

module.exports = {
    checkAuth,
    checkLogin
}