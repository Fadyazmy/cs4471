### Instructions 
To install run, make sure to install node(https://nodejs.org/en/download/), and npm (https://www.npmjs.com/get-npm) first 
2. Then `npm i` in the local directory to install all packages.

Development: 
1. Include the file firebaseConfig.js that we included the OWL submission in the /src folder (along with app.js and index.js) 
3. Run `npm run start` to start the server and you can access the server at http://localhost:3000
4. Update the lookup url in line 46 of file StockLookUp.jsx from executing file called historic_prices.py in repo ( https://github.com/christam96/service-oriented-architecture.git) 
5. Update the EF url in line (103) in Dashboard.jsx from running file EfficientFrontier.py from (https://github.com/christam96/service-oriented-architecture.git)

Deployment: 
1. Run `npm build`
2. Run `firebase deploy`