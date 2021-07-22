const mongoose = require('mongoose');

const databaseConntection = async () => {
    try {
        await mongoose.connect( process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log( 'Database connection was successful.')
        
    } catch (error) {
        console.log( 'Error: ', error );
        throw new Error( 'There was an connection error.' );
    }
}

module.exports = {
    databaseConntection
}