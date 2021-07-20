const User = require('../models/user.model');
const bcrypt = require('bcryptjs');


const getUsers = (req, res) => {
    const { id, name = 'No name', page } = req.query;
    console.log(req.query);
    res.json({
        msg: ' get API',
        id,
        name,
        page
    });
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

const putUsers = (req, res) => {
    res.json({
        msg: ' put api'
    });
}

const deleteUsers = (req, res) => {
    res.json({
        msg: ' delete api'
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