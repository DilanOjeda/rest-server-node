
const { Schema, model } = require('mongoose');

const userSchema = Schema({
    name: {
        type: String,
        required: [true, 'The name is requeried.']
    },
    email: {
        type: String,
        required: [true, 'The gmail is requeried.'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'The password is requeried.']    
    },
    image: {
        type: String
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE',
        enumeration: ['ADMIN_ROLE, USER_ROLE']
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

// Override toJSON function
userSchema.methods.toJSON = function(){
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id;
    return user;
} 

module.exports = model( 'User', userSchema );