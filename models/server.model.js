
const express = require('express');
const cors = require('cors');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.pathUsers = '/api/users';

        // Middlewares
        this.middleware();

        // App routes
        this.routes();
    }

    middleware(){
        //Cors 
        this.app.use( cors() );

        //
        this.app.use( express.json() );
        
        // Public Directory
        this.app.use( express.static('public') );
    }
    routes(){
        
        this.app.use( this.pathUsers, require('../routes/users.route') );
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log( `It is running on port ${this.port}` );
        });
    }
}


module.exports = Server;