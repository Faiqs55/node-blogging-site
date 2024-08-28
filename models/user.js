const mongoose = require('mongoose');
const { createHmac, randomBytes } = require('node:crypto');

const userSchema = new mongoose.Schema({
    fName: {
        type: String,
        required: true
    },
    lName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salt: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    profileImg: {
        type: String,
        default: '/images/userDefault.png'
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    }
}, {timestamps: true});

// USER PRE SAVE MIDDLEWARE 
userSchema.pre('save', function(next){
    const user = this;
    let salt = randomBytes(16).toString();
    user.password = createHmac('sha256', salt).update(user.password).digest('hex');
    user.salt = salt;

    next();
});

// STATIC VIRTUAL FUNCTIONS 
userSchema.static('userLogin', async function(email, password){
    let user = await this.findOne({email});
    if(!user) return {error: 'Invalid Email Address'};

    let userPass = user.password;
    let salt = user.salt;
    let userGivenPass = createHmac('sha256', salt).update(password).digest('hex');
    if(userGivenPass !== userPass) return {error: 'Incorrect password'};

    return user;
});


const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;