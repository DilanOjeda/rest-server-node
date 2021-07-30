
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT); 

const verifyGoogle = async ( idToken = '' ) => {
    
    const ticket = await client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT,  // Specify the CLIENT_ID of the app that accesses the backend
    });
    
    const { name, email, picture: image } = ticket.getPayload();
    return { name, email, image };
}

module.exports = {
    verifyGoogle
}