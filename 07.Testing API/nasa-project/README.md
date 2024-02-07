## Testing APIs

- All the codes comes from NASA project

# Lesson 1. Testing in Node

https://academy.zerotomastery.io/courses/1206554/lectures/31987559

N: Concepts of testing. API test in Nodejs.

# Lesson 2. Testing APIs with Jest

https://academy.zerotomastery.io/courses/1206554/lectures/31987560

- Package Jest includes:

* <Test runner>. Finds all the test in your project
* <Test fixtures>. How your test is organize by module and by individual test
* <Assertions>. functions that we expect a determine result
* <Mocking>. Mocking the database we we dont create new data while testing.

1. Install Jest npm package for testing. It is a development dependency coz we use the test during development, we dont need to test out test during production

cd server
npm install jest --save-dev

2. server/package.json. Write the script to start "jest"
   "scripts": {
   "test": "jest",
   "test-watch": "jest --watch",
   },

3. server/routes/. Create a file <launches.test.js> to contain all the test in the lauches endpoint.

4. write scrip in root package.json to run test in client and server:
   "test": "npm test --prefix server && npm test --prefix client"

N: Website documentation for testing (jest):
https://jestjs.io

# Lesson 3. Testing APIs endpoints with supertest. Get

https://academy.zerotomastery.io/courses/1206554/lectures/31988379

N: Using <supertest> libray (package) to make it easy to do the HTTP request

1. Install supertest
   cd server
   npm install supertest --save-dev

2. Requite supertest
   const request = require('supertest');

3. Require app.js
   const app = require('../../app');

4. Create a test to get the launches:
   describe('Test GET / launches', ()=>{
   test('It should respond with 200 success', async ()=>{
   const response = await request(app)
   .get('/launches')
   .expect(200);
   });
   });

N: I have a bug when testing GET and trying to validate 'Content-Type', /json/.

# Lesson 4. Testing APIs endpoints with supertest. POST

https://academy.zerotomastery.io/courses/1206554/lectures/31996284

describe('Test POST / launch', ()=>{
const completeLaunchData = {
mission: 'USS Enterprise',
rocket: 'NCC 1701-D',
target: 'Kepler-62 f',
launchDate: 'January 4, 2028',
};

    const launchDataWithoutDate = {
        mission: 'USS Enterprise',
        rocket: 'NCC 1701-D',
        target: 'Kepler-62 f',
        };

    const launchDataWithInvalidDate = {
      mission: 'USS Enterprise',
      rocket: 'NCC 1701-D',
      target: 'Kepler-62 f',
      launchDate: 'zoot',
        };

    test('It should respond with 201 success', async ()=>{
        const response = await request(app)
            .post('/launches')
            .send(completeLaunchData)
            .expect('Content-Type', /json/)
            .expect(201);

        const requestDate = new Date(completeLaunchData.launchDate).valueOf;
        const responseDate = new Date(response.body.launcheDate).valueOf;
        expect(responseDate).toBe(requestDate);

        expect(response.body).toMatchObject(launchDataWithoutDate);
    });

1. Create objects inside describe post functin that will will reuse

- completeLaunchData
- const launchDataWithoutDate
- const launchDataWithInvalidDate

2.  Use super test to check that all the components of the request are valid:
    test('It should respond with 201 success', async ()=>{
    const response = await request(app)
    .post('/launches')
    .send(completeLaunchData)
    .expect('Content-Type', /json/)
    .expect(201);

3.  Use jest (no supertest) to check the date:

        const requestDate = new Date(completeLaunchData.launchDate).valueOf;
        const responseDate = new Date(response.body.launcheDate).valueOf;
        expect(responseDate).toBe(requestDate);

        expect(response.body).toMatchObject(launchDataWithoutDate);

# Lesson 5. Testing APIs endpoints with supertest. POST error cases

https://academy.zerotomastery.io/courses/1206554/lectures/

1.  Inside describe post function. create another object with invalid date:
    const launchDataWithInvalidDate = {
    mission: 'USS Enterprise',
    rocket: 'NCC 1701-D',
    target: 'Kepler-62 f',
    launchDate: 'zoot',
    };

2.  test for missing property error:

    test('It should catch invalid required properties', async ()=>{
    const response = await request(app)
    .post('/launches')
    .send(launchDataWithoutDate)
    .expect('Content-Type', /json/)
    .expect(400);

        expect(response.body).toStrictEqual({
            error: 'Missing required launch property',
        });

    });

N: the error has to be the same we write in launches.controller/httpAddNewLaunch function.
expect(response.body).toStrictEqual({
error: 'Missing required launch property',
});

3.  Test for invalid date

        test('It should catch invalid dates',async ()=>{
            const response = await request(app)
                .post('/launches')
                .send(launchDataWithInvalidDate)
                .expect('Content-Type', /json/)
                .expect(400);

            expect(response.body).toStrictEqual({
                error: 'Invalid launch date',
            });
        });

    });

N: Same as above for the the case of invalid date

- Testing dates is a pain in the ass
