
const { Category } = require('../models')

const getCategories = async (req, res) => {
    
    try{
        const {from = 0, limit = 5 } = req.query;
        const queryStatus = { status: true };

        const categories = await Category.find( queryStatus )
                        .populate( 'user', ['name'] )
                        .skip( Number(from) )
                        .limit( Number(limit) );
        const totalCategories = await Category.countDocuments( queryStatus );
        res.json({
            msg: `It's ok from getCategories - GET request`,
            categories,
            total: totalCategories
        });

    } catch(error) {
        console.log( 'ERROR => ', error );
        res.status(500).json({
            msg: 'Something went wrong while getting categories.'
        })
    }
}

const getOneCategory = async (req, res) => {

    const { id } = req.params;
    const queryStatus = { status: true };

    const category = await Category.findById( id ).populate( 'user', ['name'] ); 
    console.log('category one: ', category)
    if( !category.status ){
        return res.status(400).json({
            msg: `The category ID ${ id } doesn't exist. `
        });
    }
    res.json({
        msg: 'Ok from getOneCategory - GET request',
        category
    });
}

const createCategory = async (req, res) => {
    
    const name = req.body.name.toUpperCase();

    const categoryDB = await Category.findOne({ name });

    if ( categoryDB ) {
        return res.status(401).json({
            msg: `The category ${ name } already exists.`
        })
    }

    // Create an object to save in the DB
    const data = {
        name,
        user: req.userAuth._id
    }

    const category = new Category( data );
        category.save();

    res.json({
        msg: 'Ok from getOneCategory - POST request',
        category
    });
        
}

const updateCategory = async (req, res) => {

    const idCategory = req.params.id;

    const {user, status, name, ...data} = req.body;
    
    const oldCategory = await Category.findById( idCategory );

    // Not to update category with status: false
    if ( !oldCategory.status ) {
        return res.status(400).json({
            msg: `The ID category ${ name } doest'n exist.`
        });
    }
    // Not to repeat the same category name
    if ( oldCategory.name === name.toUpperCase()) {
        return res.status(400).json({
            msg: `The name ${ name } has already been registered.`
        });
    }
    

    // Add name and user ID to object 
    data.name = name.toUpperCase();
    data.user = req.userAuth._id;

    const category = await Category.findByIdAndUpdate( idCategory, data, { new: true } )

    res.json({
        msg: 'Ok. - getOneCategory - PUT request',
        category
    });
}

const deleteCategory = async (req, res) => {
    const { id } = req.params;

    // const category = await Category.findByIdAndDelete( id );
    const category = await Category.findByIdAndUpdate( id, { status: false }, { new: true } );

    res.status(200).json({
        msg: 'Ok from deleteCategory - DELETE request',
        category
    });
}

module.exports = {
    getCategories,
    getOneCategory,
    createCategory,
    updateCategory,
    deleteCategory
}