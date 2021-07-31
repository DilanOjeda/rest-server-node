const User = require('../models/user.model');
const bcrypt = require('bcryptjs');


const getUsers = async (req, res) => {
    try {
        const { limit = 5, from = 0 } = req.query;
        const query = { status: true };
    
        // Reduce the request time 
        const [ users, total ] = await Promise.all([
            User.find( query )
                .skip( Number(from) )
                .limit( Number(limit) ),
            User.countDocuments( query )
        ]);

        res.json({
            total,
            users
        });
    } catch (error) {
        console.log( 'getUsers() Error: ', error );
    }
}

const postUsers = async (req, res) => {
    
    const { name, email, password, role } = req.body;
    const user = new User( { name, email, password, role } );

    // Encrypt password
    const salt = bcrypt.genSaltSync(10);    // 10 by default
    user.password = bcrypt.hashSync( password, salt );

    // Storage to Database 60f71273648f7a0110ba0e48
    await user.save();

    res.json({
        user
    });
}

const putUsers = async (req, res) => {
   
    const { id } = req.params; 
    const { _id, google, email, password, ...restUser } = req.body;

    if ( password ) {
        const salt = bcrypt.genSaltSync(10);
        restUser.password = bcrypt.hashSync( password, salt );
    }
    const user = await User.findByIdAndUpdate( id, restUser );

    res.json({
        msg: ' put api',
        user
    });
}

const deleteUsers = async (req, res) => {
    const { id } = req.params;

    const uid = req.uid;    // This req.uid comes from routes->middleware/validateJwt 
    const userAuthenticated = req.userAuth; 
    
    // To change user status
    const user = await User.findByIdAndUpdate( id, {status: false} );
    res.json({ 
        user,
    });
}

const patchUsers = () => {
    res.json({
        msg: ' patch api'
    });
}

module.exports = {
    getUsers,
    postUsers,
    putUsers,
    deleteUsers,
    patchUsers
};