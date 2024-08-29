const mongoose = require('mongoose');
const UserModel = require('./user');

const blogsSchema = new mongoose.Schema({
      title: {
        type: String,
        required: true
      },
      category: {
        type: String,
        required: true
      },
      desc: {
        type: String,
        required: true,
      },
      imgUrl: {
        type: String,
        default: '/images/blog.jpg'
      },
      author: {
        type: String,
        required: true,
      },
      authorName: {
        type: String
      },
      authorImg: {
        type: String
      }
}, {timestamps: true});

blogsSchema.pre('save', async function(next){
      let blog = this;
      let user = await UserModel.findById(blog.author);
      blog.authorName = `${user.fName} ${user.lName}`;
      blog.authorImg = user.profileImg;
      next();
});

const blogsModel = mongoose.model('blog', blogsSchema);

module.exports = blogsModel;