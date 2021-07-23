const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const User = require('../models/user.model');

const validateJwt = async (req = request, res = response, next) => {

    const token = req.header('x-token');

    // to know if exist the user token
    if ( !token ) {
        return res.status(401).json({
            msg: 'There is not a token in the request.'
        });
    }
    try {
        
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );        //return an object with payload data
        req.uid = uid;        

        const userAuth = await User.findById( uid );
        req.userAuth = userAuth;

        if ( !userAuth ){
            return res.status(401).json({
                msg: 'Token not valid - not found.'
            });
        }

        // Verify if the authenticated user is available (status=true)
        if ( !userAuth.status ) {
            return res.status(401).json({
                msg: 'Token not valid - user status.'
            });
        }

        next();
    } catch (error) {
        console.log('Error trycatch', error);
        res.status(401).json({
            msg: 'Token not valid.'
        });
    }
}

module.exports = {
    validateJwt
}