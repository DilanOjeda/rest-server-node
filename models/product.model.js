const { Schema, model, SchemaType } = require('mongoose');

const productSchema = Schema({
    name: {
        type: String,
        required: [true, 'The name is required'],
        unique: true
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    price: {
        type: Number,
        dafault: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    description: {
        type: String
    },
    available: {
        type: Boolean,
        default: true
    }

});

productSchema.methods.toJSON = function() {
    
    const { status, __v, _id, ...product } = this.toObject();
    product.pid = _id;
    return product;
}

module.exports = model( 'Product', productSchema );
