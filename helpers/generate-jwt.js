
const jwt = require('jsonwebtoken');

const generateJwt = (uid = '') => {

    return new Promise((resolve, reject) => {
        
        const payload = { uid };

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (error, token) => {

            if ( error ) {
                console.log(error);
                reject( 'Token was not be able to be generated.')
            }else{
                resolve( token );
            }
        });

    });
}

module.exports = {
    generateJwt,
}