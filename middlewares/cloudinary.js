const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: "dhdgrfseu",
    api_key: '858162926983449',
    api_secret: 'oSHi6nVomYtX10GDz8K3--OJzlE'
});

module.exports = cloudinary;