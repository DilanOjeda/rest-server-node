
const { response } = require("express");
const bcrypt = require('bcryptjs');
const User = require('../models/user.model'); 
const { generateJwt } = require('../helpers/generate-jwt');


const login = async (req, res=response) => {
    
    const { email, password } = req.body;
    try {
        // Verify if the email exists
        const user = await User.findOne({ email });
        if ( !user ) {
            return res.status(400).json({
                msg: `User / Password are not correct. - email`
            });
        }
        // Verify if the user is active
        if ( !user.status ) {
            return res.status(400).json({
                msg: 'User / Password are not correct. - status'
            })
        }
        const validPassword = bcrypt.compareSync( password, user.password );
        // Verify the password 
        if ( !validPassword ){
            return res.status(400).json({
                msg: 'User / Password are not correct. - validPassword'
            })
        }

        // Generate a JWT
        const token = await generateJwt( user.id );

        // Send the result
        res.json({
            msg: 'postAuth ok',
            user,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'There was a problem. Contact your system administrator for more info.'
        });
    }
}

module.exports = {
    login,
}