## Working with REST APIs - SpaceX project

# Lesson 1. Working with REST APIs - SpaceX project. Introduction

https://academy.zerotomastery.io/courses/1206554/lectures/32067384

# Lesson 2. The Space X API

https://academy.zerotomastery.io/courses/1206554/lectures/32081395

# Lesson 3. Versioning Node APIs

https://academy.zerotomastery.io/courses/1206554/lectures/32081411
https://academy.zerotomastery.io/courses/1206554/lectures/32081413

1. Create a file (api) inside routes folder
2. Move the logig of routes in app to this file:
   const express = require('express');

   const planetRouter = require('./planets/planets.router')
   const launchesRouter = require('./launches/launches.router')

   const api = express();

   api.use('/planets', planetsRouter);
   api.use('/launches', launchesRouter);

   module.exports = api;

- We need to update the path when requiring planetsRouter and launchesRouter

3. Set the verion in the URL path. src/app.js
   app.use('/v1', api);

- Now the URL will be like this:
  localhost:8000/v1/planets

* the "v1" will be place before the endpoints

4. Update the client (frontend) witht he new URL

5. Update launches.test.js with the new endpoint (placing the /v1/)

# Lesson 5. Exploring Space X launches

https://academy.zerotomastery.io/courses/1206554/lectures/32058371

N: Checking the missions rockets sent by Musk
https://github.com/r-spacex/SpaceX-API

# Lesson 6. Running search queries

https://academy.zerotomastery.io/courses/1206554/lectures/32067786

search:
https://github.com/r-spacex/SpaceX-API

click in Docs:
https://github.com/r-spacex/SpaceX-API/blob/master/docs/README.md

Run in POSTman

N: Using POST method to populate a request. Sometimes the initial request return a collection of objects as a string in order to save space and time, and then we need to populate the key with this method... weid talk...

- It is saved in a collection in POSTman (my_spaceX)

# Lesson 7. Loading Space X data in our API

https://academy.zerotomastery.io/courses/1206554/lectures/32067799

Using the same process of POSTman with axios... long explanation

1. server.js Load data from SpaceX API before start server:

const {loadLaunchData} = require('./models/launches.model');

async function startServer(){

    await loadLaunchData();

    server.listen(PORT, ()=>{
        console.log(`listenning to port: ${PORT}`)
    });

}

2. Install axios

cd server
npm install axios

# Lesson 8. Mapping SpaceX Data to our Database

https://academy.zerotomastery.io/courses/1206554/lectures/32067834

Create a function to use axios in order to fetch the launch from SpaceX project (Elan Musk).
function loadLaunchData

1.  We get the data that we need to populate (early explanation why).
2.  Looping thru the fetched data and Create a const (launch). The value from the function has to match the value of SPACEX project (check POSTman my_Space collection)
3.  Get the value for customer is more complicated becase the are two arrays that need to be flatted:

           const payloads = launchDoc['payloads'];
        const customers = payloads.flatMap((payload)=>{
            return payload['customers'];
        });

# Lesson 9. Using paginated API

https://academy.zerotomastery.io/courses/1206554/lectures/32067892

Some API are settle to return a limit amount of collection storage in page. SPACEX returns 10 collection for page. we can determine which page and the amount we want by setting in the options:
"page": 2,
"limit": 10

- In this case we want all the pages so we set the pagination to false, like this:

  const response = await axios.post(SPACEX_API_URL, {
  query:{},
  options:{
  pagination: false,
  populate:[

# Lesson 10. Minimixing API load

https://academy.zerotomastery.io/courses/1206554/lectures/32067894

1. Create a condiction in function loadLaunchData to check if we already have loaded the data otherwise we populate the database

2. create a function (populateLaunches) that contains all the logic from populating the data

# Lesson 11. Persisting SpaceX launches:

https://academy.zerotomastery.io/courses/1206554/lectures/32033895

1. launches.mongo.js Removing the require from the launch schema for target so it will allow us to save launches from the SpaceX API
   target:{
   type: String,
   },

2. launches.model.js. Move condiction of existingPlanet from saveLaunch to scheduleLaunch. Otherwise it will throw an error when trying to save the data from SpaceX API since those planets does not exist in my mongoDB:

async function scheduleNewLaunch(launch){
const planet = await planets.findOne({
keplerName:launch.target
});

    if(!planet){
        throw new Error('No matching planet was found');
    }

}

3. in populateLaunces, Call the function to save planets and pass the onject(launc) we built:
   await saveLaunch(launch);

4. Check if the response is not ok and then throw an erro:
   if(!response.status === 200){
   console.log('Problem downloading data');
   throw new Error('Launch download data fail')
   }

# Lesson 12. Pagination to our endpoint I

https://academy.zerotomastery.io/courses/1206554/lectures/32034005

# Lesson 13. Pagination to our endpoint II

https://academy.zerotomastery.io/courses/1206554/lectures/32048094

1. Create a file (query) inside service:

const DEAFULT_PAGE_NUMBER = 1;
const DEAFULT_PAGE_LIMIT = 0;

function getPagination(query){
const page = Math.abs(query.page) || DEAFULT_PAGE_NUMBER;
const limit = Math.abs(query.limit) || DEAFULT_PAGE_LIMIT;
const skip = (page - 1) \* limit;

    return{
        skip,
        limit,
    }

}

module.exports = {
getPagination,
};

- function Math.abs. return an absolute positive number
- const skip = (page - 1) \* limit; If we are in page 1, then we skip cero documents because 1-1 = 0.
- const page = Math.abs(query.page) || DEAFULT_PAGE_NUMBER we pass a default value in case that the user does not pass a value

- const limit = Math.abs(query.limit) || DEAFULT_PAGE_LIMIT;. In this case we set default to 0 so the limit will be infinit.

2. Pass the getPAgination Function into httpGetAllLanches function in launches.controller.js:

const {
getPagination
} = require('../../services/query');

async function httpGetAllLaunches(req, res){
const {skip, limit} = getPagination(req.query);
const launches = await GetAllLaunches(skip, limit)
return res.status(200).json(launches);
}

3. launches.model.js: Filter the request by limit the amount of collection and skip (page), We also need to sort the request by flight numbers so it will come with the right order (descending: flightNumber: 1, ascending: flightNumber: -1 )

   async function GetAllLaunches(skip, limit){
   return await launchesDatabase.
   find({}, {
   '\_id':0, '\_\_v':0
   })
   .sort({flightNumber: 1})
   .skip(skip)
   .limit(limit);
   }

- skip and limit are builtin function, we need to pass the parameter when we call GetAllLaunches from launch.controller(httpGetAllLaunches).

When we pass page 1, the value of skip is 0 so it wont skip any collection and we get the first values depending on the limit we set.

If we pas page 2 limit 5 then we skip the first 5 collections. URL is like this:
localhost:8000/v1/launches?limit=5&page=2
query params:
key: limit, value: 5
key: page, value:2
with the <?> we can chain param after the endpoint

# Lesson 14. Cleanning launch data

https://academy.zerotomastery.io/courses/1206554/lectures/32048096

Clear the data in mongoDB, stop the server and restart again.

# Lesson 15. Managing secret with Dotenv

https://academy.zerotomastery.io/courses/1206554/lectures/32977711

Process to secure secrets:

1. Install dotenv package at root server:
   cd server
   npm install dotenv

2. Create .env file at root server

3. copy the port and the key in .env
   PORT = 8000
   MONGO_URL = mongodb+srv://nasa-api:G3cfoPxqorKUve20@nasa.8bgxoyf.mongodb.net/

4. src/service/mongo.js Connect the value of the access string that is saved in .env, like this:
   const MONGO_URL = process.env.MONGO_URL;

5. Require dotenv like this:
   require('dotenv').config();

- It has to be above all the local require so this is affect the whole app.

6. Add .env to .gitignore

# Lesson 16. Securing leaked secrets

https://academy.zerotomastery.io/courses/1206554/lectures/32977714

We can change the password of our database directly in Atlas in case that we have leaked out password to GitHub
