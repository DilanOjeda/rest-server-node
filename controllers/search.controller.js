
const { ObjectId } = require('mongoose').Types;
const { User, Category, Product } = require('../models')

const permittedCollection = [
    'categories',
    'products',
    'users',
    'rols',
]


const searchUsers = async (term, res) => {

    const isIdMongoDb = ObjectId.isValid( term );

    if ( isIdMongoDb ) {
        const user = await User.findById( term );
        return res.status(400).json({
            results:  ( user ) ? [ user ] : []
        });
    }

    const regex =  new RegExp( term, 'i' );
    const users = await User.find({
        $or: [ {name: regex}, {email: regex} ],
        $and: [{ status: true }]
    });

    res.json({
        results: users
    });
}

const searchCategories = async (term, res) => {

    const isIdMongoDb = ObjectId.isValid( term );

    if( isIdMongoDb ) {
        const category = await Category.findById( term );
        return res.status(400).json({
            results:  ( category ) ? [ category ] : []
        });
    }

    const regex =  new RegExp( term, 'i' );
    const categories = await Category.find({
        $or: [{ name: regex }],
        $and: [{ status: true }]
    });

    res.json({
        results: categories
    });
    
}

const searchProducts = async (term, res) => {

    const isIdMongoDb = ObjectId.isValid( term );

    if( isIdMongoDb ) {
        const product = await Product.findById( term );
        return res.status(400).json({
            results:  ( product ) ? [ product ] : []
        });
    }

    const regex =  new RegExp( term, 'i' );
    const products = await Product.find({
        $or: [{ name: regex }],
        $and: [{ status: true }]
    });

    res.json({
        results: products
    });
    
}

const searcher = async (req, res) => {

    const { collection, term } = req.params;

    if ( !permittedCollection.includes(collection) ) {
        return res.status(400).json({
            msg: `The permitted collection are: ${ permittedCollection }`
        });
    }

    switch ( collection) {
        case 'users':
            searchUsers( term, res );
            
            break;

        case 'categories':
            searchCategories( term, res );
            break;

        case 'products':
            searchProducts( term , res );
            break;

    
        default:
            res.status(500).json({
                msg: 'The colletion name is not correct.'
            });
            break;
    }
    
}

module.exports = {
    searcher
}