# Photo-Gallery-Service

### Requirements
- A SQL server
- SQL server configuration environment variables
SQL_HOST=localhost
SQL_USER=me
SQL_PASSWORD=secret
SQL_DATABASE=my_db
- Optional: Node configuration environment variable (default is 3000)
PORT=3003

### Start Up
1. Run `npm install`
2. Run `npm run seed`
3. Run `npm run build` to start up webpack
4. Run `npm run start` to start up server

### To Add this Service to your Proxy Server
1. Git clone repo into your directory
2. Within the proxy's `index.html` file:
    A. Add this div within the body:
    `<div id="photo-gallery"></div>`
    B. Add this script tag at the end of the body:
    `<script src="http://localhost:3003/bundle.js"></script>`
3. In your terminal, cd into the photo-gallery-service directory.
   Run these commands:
      `npm install`
      `npm run build`
4. Start MySQL (& install if not installed)
5. In you terminal, cd into `photo-gallery-service/database`
6. Run `npm run seed` to seed the MySQL database
7. Run `npm run start` to start up the server

