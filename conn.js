const mongoose = require('mongoose');


const connectToDB = async (url) =>{
    return mongoose.connect(url)
    .then(()=> console.log('Database Connected'))
    .catch(e => console.log(e));
};

module.exports = connectToDB;