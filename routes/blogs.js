const express = require('express');
const UserModel = require('../models/user');
const upload = require('../middlewares/multer');
const jwt = require('jsonwebtoken');
const blogsModel = require('../models/blogs');
const { uploader } = require('../middlewares/cloudinary');
const blogsRouter = express.Router();

blogsRouter.get('/add', async (req, res)=>{
    let user = await UserModel.findById(req.userID);
     res.render('addBlog', {user});
});

blogsRouter.post('/add', upload.single('imgUrl'), async (req, res) => {
    let data = req.body;
    let token = req.cookies.userAuth;
    let id = jwt.verify(token, process.env.LOGIN_SECRET);
    if(req.file){
        let result = await uploader.upload(req.file.path);
        data = {
        ...data,
        imgUrl: result.secure_url,
        author: id.id
    };
    }
    
    let blog = await blogsModel.create(data)
    res.redirect('/');
});

blogsRouter.get('/', async (req, res) => {
    let blogs = await blogsModel.find({});
    res.render('allPosts', {blogs, user: req.user});
});

module.exports = blogsRouter;