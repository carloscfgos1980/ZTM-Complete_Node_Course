## Databases

# Introduction to databases

https://academy.zerotomastery.io/courses/1206554/lectures/31996325

# Lesson 2. Comparing SQL vs NoSQL

https://academy.zerotomastery.io/courses/1206554/lectures/31996326

SQL. POSTGRES:
type: Relational
Organized into: Tables
query language: SQL
Scaling: Primarily vertical

NoSQL: MongoDB
type: Document
Organized into: Collections
query language: NOSQL
Scaling: Primarily horizontal

# Lesson 3. Database shemas & Schemaless databases

https://academy.zerotomastery.io/courses/1206554/lectures/31997261

# Lesson 4. Choosing a database for our NASA project

https://academy.zerotomastery.io/courses/1206554/lectures/31997265

# Lesson 5. SQL vs MongoDB. Trends and Object-Relational Impedance Mismatch

https://academy.zerotomastery.io/courses/1206554/lectures/31998748

N: MongoDB is more modern than SQL and used by large databases like Google. It stores the data in collection in json format instead of tables (SQL).

# Lesson 6. SQL vs MongoDB. Schemas, references and ACID transitions

https://academy.zerotomastery.io/courses/1206554/lectures/31998859

MongoDB: Best for unstructured data or where the structure will change often

SQL: Structured of the data is know and well defined

# Setting Up MongoDb

https://academy.zerotomastery.io/courses/1206554/lectures/31999254

N: This lesson is very important to set the database. It took me some time to figure it out. The explanation is not quite the same coz the updates

N: I logging with Google

# Lesson 8. Connecting MongoDB

https://academy.zerotomastery.io/courses/1206554/lectures/32012424

- To connect the MongoDB it is recommended to use a npm package named <mongoose>

1. Install mongoose package
   cd server
   npm install mongoose
2. src/server.js

   const mongoose = require('mongoose');

   const MONGO_URL = 'mongodb+srv://nasa-api:G3cfoPxqorKUve20@nasa.8bgxoyf.mongodb.net/';

   mongoose.connection.once('open', ()=>{
   console.log('Mongo Connection ready!');
   });
   mongoose.connection.on('error', (err)=>{
   console.log(err);
   });

async function startServer(){
await mongoose.connect(MONGO_URL);

I was setting my MongoDB and I ran into two problems:

1. MongoParseError: options usefindandmodify, usecreateindex, useunifyTopology were undefined
2. ::: 8000 already on use.

First problem I solved after google and realized that this optios are decapricated fromt he new version on mongoose so is solved by delete them

Second problem I solved by changing the number of the port, by I wonder why the port (8000) is still on use and how I can rever this.
Thanks in advance for the help

Apprarently I didn't kill the server properly, that is why I had that problem with the PORT. I restart the computer and the problem was solved!

# Lesson 9. Mongoose

https://academy.zerotomastery.io/courses/1206554/lectures/32012428

# Lesson 10. Create Mongoose Schema for launches

https://academy.zerotomastery.io/courses/1206554/lectures/32012432

1. src/models/. Create a file: <launches.mongo.js>

2. Create schema for launches

   const mongoose = require('mongoose');

const launchesSchema = new mongoose.Schema({
flightNumber:{
type: Number,
required: true
},
launchDate:{
type: Date,
required: true
},
mission:{
type: String,
required: true
},
rocket:{
type: String,
required: true
},
target:{
type: String,
required: true
},
customers:[String],
upcoming:{
type:Boolean,
requited: true
},
success:{
type:Boolean,
requited: true,
default: true
}
});

// Model connects launches schema with launches collections
module.exports = mongoose.model('Launch', launchesSchema);

# Lesson 11. Creating Mongoose schema for plantes

https://academy.zerotomastery.io/courses/1206554/lectures/32012435

N: There are some adjustments to do in the frontend:
https://academy.zerotomastery.io/courses/1206554/lectures/43123629

# Lesson 12. Creating models for schemas

https://academy.zerotomastery.io/courses/1206554/lectures/32012440

# Lesson 13. Mongoose models vs MVC Models

https://academy.zerotomastery.io/courses/1206554/lectures/32012444

MVC Models stands for Models View Controllers, for example plantes.model.js

# Lesson 14. Inserting and updating documents

https://academy.zerotomastery.io/courses/1206554/lectures/32013328

N: Populating MongoDB, we need to to upsert so it will not duplicate the insertion of docutments due loadPlanetsData function which is a Promise... I hope this will make sense in the future

# Lesson 15. Finding documents

https://academy.zerotomastery.io/courses/1206554/lectures/32013329

- Check mongoose website:
  https://www.npmjs.com/package/mongoose

I convert the functions relating to planets into async functions:

planets.model.js
async function getAllPlanets(){
return await planets.find({})
}

planets.controller.js:
async function httpGetAllPlanets(req, res){
return res.status(200).json(await getAllPlanets());
}

# Lesson 16. Upsert operation

https://academy.zerotomastery.io/courses/1206554/lectures/32025305

- import planets schema
  const planets = require('./planets.mongo');

1. Create a function to add the data and check for errors. Using the method upsert, which check if the data exist, if it does not exist, then it load it.

async function savePlanets(planet){
try{
await planets.updateOne({
keplerName:planet.kepler_name,
}, {
keplerName:planet.kepler_name,
}, {
upsert: true
});
} catch(err){
console.err(`could not save planet ${err}`);
}
}

2.  populate the mongoDB

              .on('data', async (data)=>{
                  if(isHabitablePlanet(data)){
                      savePlanets(data)
                  }

3.  Check for the amount of planets:
    .on('end', async() => {
    const countPlanetsFound = (await getAllPlanets()).length;
    console.log(`${countPlanetsFound} habitable planets found!`);
    resolve();
    });

4.  Make this function into async

async function getAllPlanets(){
return await planets.find({})
}

# Lesson 17. Exploring data using Atlas

https://academy.zerotomastery.io/courses/1206554/lectures/32025377

# Lesson 18. Updating project arquitecture

https://academy.zerotomastery.io/courses/1206554/lectures/32025791

# Lesson 19. Updating project arquitecture

https://academy.zerotomastery.io/courses/1206554/lectures/32025791

Use a drawing app for charts
https://lucid.app/documents#/documents?folder_id=recent

# Lesson 20. objectsId

https://academy.zerotomastery.io/courses/1206554/lectures/32026320

N: MongoDB creates ids that contains data of when the object was created. Ex:
"\_id": "6528d265bd9eae6f2e0f450e",

This is is an embedded stamptime. If we copy in this website it will give us the time that the object was created:
https://steveridout.com/mongo-object-time/

# Lesson 21. Excluding value from the Response

https://academy.zerotomastery.io/courses/1206554/lectures/32026321
{
"\_id": "6528d265bd9eae6f2e0f450e",
"keplerName": "Kepler-1652 b",
"**v": 0
},
"**v": 0. This means we can have diffent versions of the database

This the following function,, the secong argument is used to exclude value from the response.
async function getAllPlanets(){
return await planets.find({}, {
'\_id':0, '\_\_v':0
});
}

# lesson 22. Saving Launches

https://academy.zerotomastery.io/courses/1206554/lectures/32026322

- Get the schema for the launch:
  const launchesDatabase = require('./launches.mongo');

- Create a async function to save the launch in the database:
  async function saveLaunches(launch){
  await launchesDatabase.updateOne({
  flightNumber: launch.flightNumber
  },
  launch, {
  upsert: true
  });
  }

* This function has thre arguments:

1. <{flightNumber: launch.flightNumber}>. Check if the flightNumber exist before add a new launch
2. <launch>. To add a new launch in case that the flightnumber does not match
3. <{upsert:true}>. To update and insert

- Call the function to save the launch
  saveLaunches(launch);

# Lesson 23. Listing all launches

https://academy.zerotomastery.io/courses/1206554/lectures/32026319

N: The functions has to be async coz we are retriving data from MongoDB

async function GetAllLaunches(){
return await launchesDatabase.
find({}, {
'\_id':0, '\_\_v':0
});
}

async function httpGetAllLaunches(req, res){
return res.status(200).json(await GetAllLaunches());
}

# Lesson 24. Referential Integrity

https://academy.zerotomastery.io/courses/1206554/lectures/32026520

With SQL we can check easily if one value exist in otther table when we are query the value but with Node is a bit more complicated

1.  Require the planets schema:
    const planets = require('./planets.mongo');

2.  Inside the saveLaunch function we check if the planet exist nd then we throw an error if it does not exist:

    async function saveLaunches(launch){
    const planet = await planets.findOne({
    keplerName:launch.target
    })

        if(!planet){
            throw new Error('No matching planet was found');
        }

    }

# Lesson 25. Auto increment in MongoDB

https://academy.zerotomastery.io/courses/1206554/lectures/32034090

N: In SQL increment a number is quit easy coz it has a builtin function to do so, that is not the case with MongoDB. Next lesson explain how to increment the flightNumber

# Lesson 26. Getting latest flightNumber

https://academy.zerotomastery.io/courses/1206554/lectures/32034092

1.  Function to get the latest flightNumber:

        async function getLatestFlightNumber(){
        const latestLaunch = await launchesDatabase
            .findOne()
            .sort('-flightNumber');

        if(!latestLaunch){
            return DEAFULT_FLIGHT_NUMBER
        }

        return latestLaunch.flightNumber

    }

- .find returns a list of documents that matches our filter
- .findOne returns only one document that match our filter
- .sort(flightNumbers) returns a list of document sorting from ascendong order, from lower to higer number, if we want to have the other way around, we need to place a (-) before propery (flightNumber) we are sorting.

- Checking if there is no launch saved, then return a flight number as default:
  if(!latestLaunch){
  return DEAFULT_FLIGHT_NUMBER
  }

# Lesson 27. Scheduling new launches

https://academy.zerotomastery.io/courses/1206554/lectures/32035652

1.  Function to add new launches:
    async function scheduleNewLaunch(launch){
    const newFlightNumber = await getLatestFlightNumber() + 1;

        const newLaunch = Object.assign(launch, {
                success: true,
                upcoming: true,
                customers:['ZTM', 'NASA'],
                flightNumber: newFlightNumber,
        });

        await saveLaunch(newLaunch)

    }

2.  launches,controller.js We need to convert function httpAddNewLaunch into async function coz we are adding new launches that require data from database:
    await scheduleNewLaunch(launch);

# Lesson 28. Investigating a mongo Mistery

https://academy.zerotomastery.io/courses/1206554/lectures/32047516

in launches.model, in async function saveLaunch, change:
await launchDatabase.updateOne
for:
await launchesDatabase.findOneAndUpdate

So the response from launching a flight wont contain MongDb indo that could be used for a hacker to access to our database

# Lesson 29. Abort launches

https://academy.zerotomastery.io/courses/1206554/lectures/32047517

- When we return the deleted object like this:
  async function abortLaunchById(launchId){
  return await launchesDatabase.updateOne({

      const aborted = await abortLaunchById(launchId)
      return res.status(200).json(aborted);

  Response from POSTman:
  {
  "acknowledged": true,
  "modifiedCount": 1,
  "upsertedId": null,
  "upsertedCount": 0,
  "matchedCount": 1
  }

* In order to get a eyedfriendly response we need to connect the response to "modidiedCount", like this in launch.model.js:
  async function abortLaunchById(launchId){
  const aborted = await launchesDatabase.updateOne({
  flightNumber:launchId
  }, {
  upcoming: false,
  success: false,
  });

      return aborted.modifiedCount === 1;

  }

We call the above funtion from launches.controllers.js:

async function httpAbortLaunch(req, res){
const launchId = Number(req.params.id)

    // if launch doesnt exist
    const existLaunch = await existsLaunchWithId(launchId)
    if(!existLaunch){
        return res.status(404).json({
        error: "Launch not found",
        });
    }

    // if launch does exist
    const aborted = await abortLaunchById(launchId)
    if(!aborted){
        return res.status(400).json({
            error: 'Launch not aborted'
        });
    }
    return res.status(200).json({
        ok: true,
    })

}

# Lesson 30. Updating Test for Mongoose 1

https://academy.zerotomastery.io/courses/1206554/lectures/32058438

1.  We add some code so we can run jest framework for testing with Mongoose. server/package.json:

"jest":{
"testEnvironment": "node"
},

# Lesson 31. Updating Test for Mongoose 2

https://academy.zerotomastery.io/courses/1206554/lectures/32058460

2. Move all the logic from mongoose to a seingle file (mongo) storage in a folder (service). src/service/mongo.js

   const mongoose = require('mongoose');

   const MONGO_URL = 'mongodb+srv://nasa-api:G3cfoPxqorKUve20@nasa.8bgxoyf.mongodb.net/';

   // event listeners
   mongoose.connection.once('open', ()=>{
   console.log('Mongo Connection ready!');
   });
   mongoose.connection.on('error', (err)=>{
   console.log(err);
   });

   async function mongoConnect(){
   await mongoose.connect(MONGO_URL);
   }

   async function mongoDisconnect(){
   await mongoose.disconnect();
   }

   module.exports = {
   mongoConnect,
   mongoDisconnect,
   }

3. import and call the mongoConnect function from server.js.:
   async function startServer(){
   await mongoConnect();

4. Use mongoose by implementing the functions of connect and disconnect:
   4.1 Import the functions
   const {
   mongoConnect,
   mongoDisconnect,
   } = require('../../services/mongo');

   4.2 Wrap describe testing functions in another describe function:
   describe('Launches API', ()=>{

   4.3 Before the describe testing function we place to functions to connect and disconnect mongoDB:
   beforeAll(async ()=>{
   await mongoConnect();
   });
   afterAll(async()=>{
   await mongoDisconnect();
   });

- All this work in the tutorial but I have a log error messages, the test pass ok, though. I commented the afterAll function and it works!

* Extra. This is from the next module, in order to secure the key from mongoDB

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
