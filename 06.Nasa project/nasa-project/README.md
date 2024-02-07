## NASA fulll stack project

# Lesson 1. Introduction and Architecture

https://academy.zerotomastery.io/courses/1206554/lectures/31806849

Website to build diagrams. This diagram explain the arquicture of our project

https://lucid.app/documents#/documents?folder_id=recent

# Lesson 2. Nasa Front end Set up

https://academy.zerotomastery.io/courses/1206554/lectures/31819134

# Lessson 3. Hasa Dashboard functionality

https://academy.zerotomastery.io/courses/1206554/lectures/31819184

# Lesson 4. Basic about this React App

https://academy.zerotomastery.io/courses/1206554/lectures/31996286

# Lesson 5. Walkthrough React

https://academy.zerotomastery.io/courses/1206554/lectures/31843946

# lessson 6. APi server setup

https://academy.zerotomastery.io/courses/1206554/lectures/31834847

cd server
npm init
npm install express
npm install nodemon --save-dev

1. Basic server structure(server.js):

const http = require('http');
const express = require('express');

const app = express();

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

server.listen(PORT, ()=>{
console.log(`Listening on port ${PORT}...`)
})

2. Create a file (app that will contain all express logic). and then export as a module and imported in server:

app.js:
const express = require('express');

const app = express();

module.exports = app
server:
const app = require('./app');

3. app.js. Use json middleware:
   app.use(express.json());

# Lesson 7. Get Planets

https://academy.zerotomastery.io/courses/1206554/lectures/31850258

1. Create folder (routes). Inside it another folder (planets) and inside file (planets.router).

1.1 Logic in planets.router.js and export it as module that will be import it in app.js. This planets.router function as a middleware to app.js

const express = require('express');

const planetRouter = express.Router();

const {
httpGetAllPlanets,
} = require('./planets.controller')

planetRouter.get('/', httpGetAllPlanets);

module.exports = planetRouter;

1.3 - app.js:
app.use('/planets', planetRouter);

2. Inside <planets> folder, create a file <planets.controller.js>
   2.1 Logic inside <planets.controller.js> and export it so it could be use it in <planets.router>

const {getAllPlanets} = require('../../models/planets.model');

function httpGetAllPlanets(req, res){
return res.status(200).json(getAllPlanets());
}

module.exports ={
httpGetAllPlanets,
}

3. Creat a folder <models> to handle data. Inside create a file <planets.model.js>

const planets = []

module.export = planets

- Process:
  model => controller => router => app => server

4. Logic inside the client (min 10)

# Lesson 8. CORS Middleware

https://academy.zerotomastery.io/courses/1206554/lectures/31850318

1. Install CORS
   cd server
   npm install cors

2. Implement CORS in app.js

const cors = require('cors');
app.use(cors({
origin: 'http://localhost:3000',
}));

N: Setting the client in CORS so it will not reject the get request

# Lesson 9. Models vs Controllers vs Routes

https://academy.zerotomastery.io/courses/1206554/lectures/31889177

N: One model (database) can be shared in multiple controllers and viceversa.

# lesson 10. Planets model

https://academy.zerotomastery.io/courses/1206554/lectures/31889202

1. Using the dta from the planet app and copy the the functionality into planets.model.js

2. Install package to handle parsing CSV
   cd server
   npm install csv-parse

3. Export <habitablePlanets> function so it can be used in planets.controller

# Lesson 11. Loading Data on StartUp

https://academy.zerotomastery.io/courses/1206554/lectures/31889855

1. Place the function to read the CSV file inside a Promise function. This is because we use the stream method and so it will call the function before upload all the data and give an error.
   function loadPlanetsData(){
   return new Promise((resolve, reject)=>{
   fs.createReadStream(path.join(\_\_dirname, '..', '..', 'data', 'kepler_data.csv'))
   .pipe(parse({
   comment:'#',
   columns: true
   }))
   .on('data', (data)=>{
   if(isHabitablePlanet(data)){
   habitablePlanets.push(data)
   }
   })
   .on('err', (err)=>{
   console.log(err);
   reject(err);
   })
   .on('end', () => {
   console.log(`${habitablePlanets.length} habitable planets found!`);
   resolve();
   });
   });
   }

N: Me di tremenda trabaa en esta parte because I missed the part that the instructor call the argument (resolve) inside the new Promised function (planets.model.js)

- Is important to check the path coz is not the same from the previos project
  path.join(\_\_dirname, '..', '..', 'data',

2. export <loadPlanets> function

3. server.js. require the <loadPlanets> function and implemente it just before listening

const {loadPlanetsData} = require('./models/planets.model');

async function startServer(){
await loadPlanetsData();

    server.listen(PORT, ()=>{
        console.log(`listenning to port: ${PORT}`)
    });

}

startServer();

N: We need to create async function startServer in order to call await in <loadPlanets>

# Lesson 12. Automating fullstack application with NPM

https://academy.zerotomastery.io/courses/1206554/lectures/31899089

All the changes are done in the package.json in the root component. It is a way to run both the server and the client

package.json

1. Command to run server and client. --prefix indicates where the command should be used:
   "server": "npm run watch --prefix server",
   "client": "npm start --prefix client",

2. Run both backend and frontend:
   "watch": "npm run server & npm run client",

N: Use a single <&> so both process will run simuntanously

3. Install dependencies for backend and frontend:
   "install-server": "npm install --prefix server",
   "install-client": "npm install --prefix client",
   "install": "npm install --prefix server && npm install --prefix client",

N: In this case we use &&, this means to wait one process ends before start the other one

4. Run test in both places ( server and client):
   "test": "npm run test --prefix server && npm run test --prefix client"

# Lesson 13. Run React in production

https://academy.zerotomastery.io/courses/1206554/lectures/31903128

- VERY IMPORTANT: This method can host the front and backend in a single URL!
  There is a production copy of the frontend (client) inside the backend(server).

1. Create a production client in the server
   client/package.json
   "build": "BUILD_PATH=../server/public react-scripts build",

N: This will create the production frontend in our server

2. src/app.js. Serve the client:

const path = require('path');
app.use(express.static(path.join(\_\_dirname, '..', 'public')));

3. To serve the client without need to type index. src/app.js:

app.get('/\*', (req, res)=>{
res.sendFile(path.join(\_\_dirname, '..', 'public', 'index.html'))
});

4. Command to build client and then run server in <package.json> in the root

   "deploy": "npm run build --prefix client && npm start --prefix server"

# Lesson 14. Looging request with Morgan

https://academy.zerotomastery.io/courses/1206554/lectures/31922511

N: Use npm Morgan is a middleware to log all (front and backend) the request in single terminal.

1. Install package in the server:

cd server
npm install morgan

2. src/app.js. Require and implement morgan logging package:

const morgan = require('morgan');

app.use(morgan('combined'));

- This should be place as high as possible so it will contain infor from the client and the server.

# Lesson 15. Launches model

https://academy.zerotomastery.io/courses/1206554/lectures/31908636

1. Create a file launches.model.js inside models folder
2. src/models/launches.model.js. Logic to creat a default launch
   2.1 - Create a const that will have a map function

const launches = new Map();

2.2 - create a launch object based in the needs of the frontend (client)

const launch = {
flightNumber: 100,
mission: "Kepler exploration X",
rocket: "Explorer IS1",
launchDate: new Date('December 27, 2030'),
target: "Kepler-442 b",
customers: ['ZTM', 'NASA'],
upcoming: true,
success: true
};

2.3 - Use set function to populate launches. It contains 2 arguments. First is the reference (flightNumber) and the second is the object we are passing to populate the launches.

launches.set(launch.flightNumber, launch);

2.4 - Export the launches so it could be used by launches.controller.js
module.exports={
launches
}

# lesson 16. GET /launches

https://academy.zerotomastery.io/courses/1206554/lectures/31944734

1. launches.model.js. Make a function that gets all the launches and export it

   function GetAllLaunches(){
   return Array.from(launches.values());
   }

   module.exports={
   GetAllLaunches,
   }

- Array.from(launches.values()). This return the values in an array.

2. launches.controller.js Import <getAllLaunches> and use express.Router to create a endpoint with this collection of data.

function httpGetAllLaunches(req, res){
return res.status(200).json(GetAllLaunches());
}

3. launches.router.js. Create the route to get all launches.

const express = require('express');

const {
httpGetAllLaunches,
} = require('./launches.controller');

const launchesRouter = express.Router();

launchesRouter.get('/', httpGetAllLaunches);

module.exports = launchesRouter;

4. src/app.js Use middleware to create the endpoint for launches

const launchesRouter = require('./routes/launches/launches.router');

app.use('/launches', launchesRouter);

- Min 12 explains the changes in the frontend.

# lesson 17. Serving Application with Client Side Routing

https://academy.zerotomastery.io/courses/1206554/lectures/31953448

The links of the SnackBar didnt work coz express does not recognize. It is something that must be done by REACT (frontend), the way to do it is to place '\*', after the first string argument in the app get function that will send the index file, as follow:

app.get('/\*', (req, res)=>{
res.sendFile(path.join(\_\_dirname, '..', 'public', 'index.html'))
})

# lesson 18. Working with Data Models. Building a Data Access Layer

https://academy.zerotomastery.io/courses/1206554/lectures/31971952

N: Separate the modules so is clear what to do in every departnment

# Lesson 19. POST /launches: Creating Launches part I

https://academy.zerotomastery.io/courses/1206554/lectures/31972351

1. launches.model
   1.1 - Create a variable for latestFlightNumber so we can use use it to create new launch with need to itirate thru launch object.

let latestFlightNumber = 100;

1.2 - Create a function to add new launch:

function addNewLaunch(launch){
latestFlightNumber++; // increment the flightNumber by 1
launches.set(
latestFlightNumber,
Object.assign(launch, {
success: true,
upcoming: true,
customers:['ZTM', 'NASA'],
flightNumber: latestFlightNumber,
})
)
}

N: Just like we populate launches with set to add a default launch. In this case we use <set> function again, passing to arguments:

- latestFlightNumber
- launch.

* In order to pass launch with the info from the client and some other info that we have in the backend, we use <Object.assign>. This function tak to arguments:

- launch (comming from the client)
- object with the data from the backend:

            success: true,
            upcoming: true,
            customers:['ZTM', 'NASA'],
            flightNumber: latestFlightNumber,

# Lesson 20. POST /launches: Creating Launches part II

https://academy.zerotomastery.io/courses/1206554/lectures/31973631

1. launches.model.js. Export addNewLaunch function

2. launches.controller.js. Create a function to add new launches

function httpAddNewLaunch(req, res){
const launch = req.body

    launch.launchDate = new Date(launch.launchDate);

    addNewLaunch(launch);
    return res.status(201).json(launch)

}

N: launch.launchDate. Date is a special case becase is been sent as a string and needs to be converted into a date object.

3. lauches.router.js. Create a route for post new launch.
   launchesRouter.post('/', httpAddNewLaunch);

4. app.js. Make some changes in middleware for launches. The endpoint can go here instead of in the router. That is why the router only has (/) as first argument (launchesRouter.post('/', httpAddNewLaunch);):

   app.use('/launches', launchesRouter);

# Lesson 21. Validation for POST request

https://academy.zerotomastery.io/courses/1206554/lectures/31974085

src/routes/launches/launches.controller.js:

function httpAddNewLaunch(req, res){
const launch = req.body

    if(!launch.mission || !launch.rocket || !launch.launchDate || !launch.target){
        return res.status(400).json({
            error: "missing required property"
        })
    }

    launch.launchDate = new Date(launch.launchDate);

    if(isNaN(launch.launchDate)){
        return res.status(400).json({
            error: 'invalid launch date'
        })
    }

}

1.  Checking if there is not an empty value:

    if(!launch.mission || !launch.rocket || !launch.launchDate || !launch.target)

2.  Checking that the date calue sent by the client is correct:
    isNaN is a built-up function to check if the value is a Number.
    After create new Date, this is a number so with NaN function we can check if the value is correct.

# Lesson 22. Connection POST/launches with Frontend

https://academy.zerotomastery.io/courses/1206554/lectures/31979818
N: In this part all the work is done in the frontend. There was a problem with the request since one of the key of the object (launch) has a different name in the front and the backend:
"destination" is switched to "target".

# Lesson 23. DELETE/launch: Aborting launch

https://academy.zerotomastery.io/courses/1206554/lectures/31982644
https://academy.zerotomastery.io/courses/1206554/lectures/31982645

N: In this part all the work starts at the frontend and then the backend.

1. src/models/launches.model.js
   1.1 Create a function to check if that launch exist by flightNumber

   function existsLaunchWithId(launchId){
   return launches.has(launchId);
   }

1.2 Function to delete the launch. In this case is not deleted but set to false the success and upcoming.
function abortLaunchById(launchId){
const aborted = launches.get(launchId);
aborted.upcoming = false;
aborted.success = false;
return aborted
}

2. src/routes/launches/launches.controller.js Controller to abort launch

function httpAbortLaunch(req, res){
const launchId = Number(req.params.id)

    // if launch doesnt exist
    if(!existsLaunchWithId(launchId)){
        return res.status(404).json({
        error:"Launch not found",
    })
    }

    // if launch does exist
    const aborted = abortLaunchById(launchId)
    return res.status(200).json(aborted)

}

2.1 Save the id in a constant and convert it to a number since the id that come from the client is a string:
const launchId = Number(req.params.id)

2.2 Check if the launch exist, if not, then throw an error:

    if(!existsLaunchWithId(launchId)){
        return res.status(404).json({
        error:"Launch not found",
    })
    }

2.3 Call <abortLaunchById>, pass the <launchId> as argument. Save in a constant <aborted> and return it as a json so the client can verify the object:

    const aborted = abortLaunchById(launchId)
    return res.status(200).json(aborted)

3. src/routes/launches.router.js. Set the router for delete the launch

launchesRouter.delete('/:id', httpAbortLaunch);

- '/:id'. Express paameter sintax. It is the same that Reacts uses (useParagrams).

## Lesson 24. Updating our architecture diagram

https://academy.zerotomastery.io/courses/1206554/lectures/31987556

N: Using a software to draw a diagram of the project

https://lucid.app/lucidchart/c0bdf3a2-3bf4-4ec3-acb4-6e7a372890a0/edit?beaconFlowId=2EB2D152DF6BD199&invitationId=inv_95c8c529-395f-4253-b362-c514b3bdfce0&page=0_0#
