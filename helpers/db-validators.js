
const { Category, User, Role, Product } = require('../models');

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

const validateIdCategoryExistence = async ( id ) => {
    const existIdCategory = await Category.findById( id );
    if ( !existIdCategory ) {
        throw new Error( `The category ID ${ id } you entered doesn't exist. Please check that you typed the category ID correctly.` );
    }
}

const validateIdProductExistence = async ( id ) => {
    const existIdProduct = await Product.findById( id );
    if ( !existIdProduct ) {
        throw new Error( `The product ID ${ id } you entered doesn't exist. Please check that you typed the category ID correctly.` );
    }
    if ( !existIdProduct.status ) {
        throw new Error( `The product ID ${ id } you entered doesn't exist - status: false` );
    }
}

module.exports = {
    validateRole,
    validateEmail,
    validateExistenceIdUser,
    validateIdCategoryExistence,
    validateIdProductExistence
};