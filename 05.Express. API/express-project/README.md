## EXPRESS API

- when the .js is named server, it can be initialized by
  npm start
  Otherwise we have to write te start script in package.json

# Lesson 1. Introduction to Express

https://academy.zerotomastery.io/courses/1206554/lectures/31818536

npm init -y
npm install express

# Lesson 2. Express vs Next.js vs Koa

https://academy.zerotomastery.io/courses/1206554/lectures/31818534
N: Koa is another framework like express

# Lesson 3. Route parameters

https://academy.zerotomastery.io/courses/1206554/lectures/31818535

# Lesson 4. Postman and Insomnia

https://academy.zerotomastery.io/courses/1206554/lectures/31985039

# Lesson 5. Development dependencies

https://academy.zerotomastery.io/courses/1206554/lectures/31985123

- npm install nodemon --save-dev
- package.json. write this script:
  "watch": "nodemon server.js",
- npm run watch

* This will apply the changes without the need to restart the server and installeed under devDependencies. It means that it will not be included during production. nodemom package is only a tool in roder to update the code and not be necessary to restart the app.

# Lesson 7. MiddlewareWriting Our Own Logging Middleware

https://academy.zerotomastery.io/courses/1206554/lectures/31985643

# Lesson 8. POST Requests in Express

https://academy.zerotomastery.io/courses/1206554/lectures/31985513

# Lesson 9. Model View Controller (MVC)

https://academy.zerotomastery.io/courses/1206554/lectures/31985646

# Lesson 10. Model View Controller in Express

https://academy.zerotomastery.io/courses/1206554/lectures/31985646

- Using name function instead of arrow function in the controllers helps us to identify an error in the console.

- The routes are grouped into the controller folder and the data inside the models folder.

# Lesson 11. Express Routers

https://academy.zerotomastery.io/courses/1206554/lectures/31991547

- This start to complicate!
  Order of the folders

Friends Route:

- models(friends.model.js) => controllers(friends.controller.js) => routes(friends.router.js) => server.js
- models => Contains the data(array of objects)
- friends.controller => The function with the http methods (GET, POST)
- routes(friends.route.js) => Group all the routes so the server code is file si simplier and clean
- server => is where the routes are finally called:
  app.use('/friends', friendsRouter)
  app.use('/messages', messagesRouter)

* I had a bug in the app:
  I had this:
  app.use('/', friendsRouter)
  Instead of this:
  app.use('/friends', friendsRouter)
* I'n the route is only added the endpoints like this:
  friendsRouter.post('/', friendsController.postFriend);
  friendsRouter.get('/', friendsController.getFriends);
  friendsRouter.get('/:friendId', friendsController.getFriend);

# Lesson 12. RESTful APIs

https://academy.zerotomastery.io/courses/1206554/lectures/31992045

RESTful stands for
RE - REpresentation
S - State
T - Transfer

- RESTful is make use of existence standards (HTTP, JSON, URL)
- Endpoints are collection of data
- Use HTTP methods (GET, POST, PUT, PATCH, DELETE) to communicate the action that we are preforming in that collection of data.
- Client and Server architecture
- Stateless and cacheable. Stateless means that every request es separated and not connected to any any state on the Client that is not included in the request. We can catch request by saving the results for future use.

# Lesson 13. Create Read Update and Delete (CRUD)

https://academy.zerotomastery.io/courses/1206554/lectures/31991549

CRUDS common language for backend developers and stands for:
Create (Post)
Read (Get)
Update (PUT, PATCH)
Delete (Delete)

# Lesson 11. Sending files

https://academy.zerotomastery.io/courses/1206554/lectures/31996091

Sending a file. It make use of the path module in nodejs in order to place inside the sendFile function. This create a relative path to access to the file I want to send:
const path = require('path')

    res.sendFile(path.join(__dirname, '..', 'public', 'images', 'holtenbroek.jpeg'));

Explanation of the relative path (**dirname, '..', 'public', 'images', 'holtenbroek.jpeg')
**dirname => gets the name of the folder where this file is located.
'..' => gotta go un folder up
'public', 'images' => are the embedded folders where the picture is located
'holtenbroek.jpeg' => name of the picture

# Lesson 12. Serving websites with nodes

https://academy.zerotomastery.io/courses/1206554/lectures/32002852

Create a middleware for the static (very basic) app in server.js:
app.use('/site', express.static('public'));

acces at this URL:
http://localhost:3000/site/index.html

app.use(express.static('public'))

- The very basic static app is in public

* This is only an example, rarely use!

# Lesson 13. Templates engines

https://academy.zerotomastery.io/courses/1206554/lectures/32002853

We can find the docs in this site:
https://expressjs.com/en/resources/glossary.html

npm install hbs --save

- Create a views folder and move the index.html there. Then change the extension to hbs. It important to have the npm hbs installed already!

Use this to pass values to the index.hbs
app.get('/', (req, res)=>{
res.render('index', {
title: 'My friends are very',
caption: 'Holtenbroek!'
})
})

- Tremendo arroz con mango, no entendi ni pinga y no se ni pa que se usa...

# Lesson 14. Layouts and separations

https://academy.zerotomastery.io/courses/1206554/lectures/32003648

- Lot of complications that I wont use. I will uploud it just in case.
