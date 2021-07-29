
const { response } = require("express");
const bcrypt = require('bcryptjs');
const User = require('../models/user.model'); 
const { generateJwt } = require('../helpers/generate-jwt');
const { verifyGoogle } = require('../helpers/verify-google');

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

const signinGoogle = async (req, res = response) => {

    const { id_token } = req.body;
    
    try {  
        
        const {name, email, image} = await verifyGoogle( id_token );

        let user = await User.findOne( {email} );

        // If the user doesn't exist, The system will create him/her 
        if ( !user ) {
            const dataUser = {
                name,
                email,
                password: 'No one',
                image,
                google: true
            }
            user = new User( dataUser );
            await user.save();
        }
        //If the user is locked (deleted) in the DB
        if ( !user.status ) {
            return res.status(401).json({
                msg: 'The user is locked. Contact to System Administrador.'
            });
        }

        // Generate the JWT
        const token = await generateJwt( user.id );

        res.json({
            msg: 'You have signed in',
            user,
            token
        });
    } catch (error) {

        console.log( 'ERROR: ', error );
        res.status(400).json({
            msg: 'Google Token is not available.'
        })
    }
}

module.exports = {
    login,
    signinGoogle
}