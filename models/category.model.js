const { Schema, model, SchemaType } = require('mongoose');

const categorySchema = Schema({
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
    }

});

categorySchema.methods.toJSON = function() {
    
    const { status, __v, _id, ...category } = this.toObject();
    category.cid = _id;
    return category;
}

module.exports = model( 'Category', categorySchema );
