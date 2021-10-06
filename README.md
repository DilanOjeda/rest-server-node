# Rest Api Node

REST API using Node.js, Express, mongoose and MongoDB + JWT Authentication and Google Authenticator.
  
## Getting Started

1. Clone this repository

   ```bash
   git clone https://github.com/DilanOjeda/rest-server-node.git
   cd rest-server-node
   ```

2. Install the npm packages

   ```bash
   npm install
   ```

   Also install `nodemon` globally, if you don't have it yet.

   ```bash
   npm install -g nodemon
   ```

3. Congfigure environment settings

   Create a file with the following name and location `.env` and copy the contents from `.env.example` into it. Replace the values with your specific configuration. Don't worry, this file is in the `.gitignore` so it won't get pushed to github.

   ```javasscript
    # Database
    MONGODB_CNN=
    
    # Google Authenticator
    GOOGLE_CLIENT=
   ```

4. Running the app locally

   Run this command, which is located in npm script in `package.json` file.

   ```bash
   npm run start