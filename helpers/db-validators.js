
const Role = require('../models/role.model');
const User = require('../models/user.model');

const validateRole = async (role = '') => {           //If role is not sent, It'll receive undefined.
    const existRole = await Role.findOne({ role });
    if ( !existRole ) {
            throw new Error( `There isn't the role ${ role } in the Database.`)
    }
}
const validateEmail = async (email = '') => {
    const existEmail = await User.findOne({ email });
    if ( existEmail ) {
        throw new Error( `The email ${ email } has already been registered by someone else.` ); 
    }
}

const validateExistenceIdUser = async ( id ) => {
    const existIdUser = await User.findById( id );
    if ( !existIdUser ) {
        throw new Error( `There isn't the id ${ id } in the Database.` );
    }
}

module.exports = {
    validateRole,
    validateEmail,
    validateExistenceIdUser
};