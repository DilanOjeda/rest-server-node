const monogoose = require('mongoose');

const databaseConntection = () => {
    try {
        monogoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: true,
            useFindAndModify: false

        });
        console.log( 'Database connection was successful.')
        
    } catch (error) {
        console.log( 'There was an connection error.' );
    }
}

module.exports = {
    databaseConntection
}