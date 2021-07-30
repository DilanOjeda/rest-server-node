
const express = require('express');
const cors = require('cors');

const { databaseConntection } = require('../database/consfig.db'); 

class Server{
    
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            users: '/api/users',
            auth: '/api/auth',
            categories: '/api/categories',
            products: '/api/products'
        }        
        // Database Connection
        this.connecToDatabase();

        // Middlewares
        this.middleware();

        // App routes
        this.routes();
    }

    async connecToDatabase(){
        await databaseConntection();
    }

    middleware(){
        //Cors 
        this.app.use( cors() );

        // Read json format
        this.app.use( express.json() );
        
        // Public Directory
        this.app.use( express.static('public') );
    }
    routes(){
        this.app.use( this.paths.auth, require('../routes/auth.route') );
        this.app.use( this.paths.users, require('../routes/users.route') );
        this.app.use( this.paths.categories, require('../routes/categories.route') );
        this.app.use( this.paths.products, require('../routes/products.route') );
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log( `It is running on port ${ this.port }` );
        });
    }
}


module.exports = Server;