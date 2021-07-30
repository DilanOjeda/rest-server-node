
const { Product } = require('../models')



const getProducts = async (req, res) => {
    const { limit = 5, from = 0 } = req.query;
    const queryStatus = { status: true };
    
    const [ products, total ] = await Promise.all([
        Product.find( queryStatus )
            .populate( 'user', 'name')
            .populate( 'category', 'name')
            .skip( Number(from) )
            .limit( Number(limit) ),
        Product.countDocuments( queryStatus )
    ]);

    res.json({
        msg: 'ok - get 1',
        total,
        products
    });
}

const getOneProduct = async (req, res) => {

    const { id } = req.params;

    const product = await Product.findById( id )
                    .populate( 'user', 'name')
                    .populate( 'category', 'name');

    if ( !product.status ) {
        return res.status(400).json({
            msg: `The product ID ${ id } doesn't exist.`
        });
    }

    res.json({
        msg: 'ok - get 2',
        product
    });
}

const createProduct = async (req, res) => {
    
    const { name, price, category, description } = req.body;

    const nameSearch = await Product.findOne({ name });
    
    if ( nameSearch ) { 
        return res.json({
            msg: `The product name ${ name } already exists.`
        })
    }
    const user = req.userAuth._id; 
    const product = new Product( { name, user, price, category, description } );
    await product.save();

    res.json({
        msg: 'ok - post 1',
        nameSearch,
        product
    });
}

const updateProduct = async (req, res) => {

    const { id } = req.params;
    const { _id, status, ...data } = req.body;
    
    const product = await Product.findByIdAndUpdate( id, data, { new: true} );

    res.json({
        msg: 'ok - put 1',
        product
    });

}

const deleteProduct = async (req, res) => {

    const { id } = req.params;

    const product = await Product.findByIdAndUpdate( id, { status: false } );
    
    res.json({
        msg: 'ok - delete 1',
        product
    });
}

module.exports = {
    getProducts,
    getOneProduct,
    createProduct,
    updateProduct,
    deleteProduct
}