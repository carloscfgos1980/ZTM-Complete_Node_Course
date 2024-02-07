# server

# vocabulary

http - stands for hyper text ransfer protocol
https - secure version that encripts our communication

# Lesson 1. What is a Web Server?

https://academy.zerotomastery.io/courses/1206554/lectures/31785822

# Lesson 2. Introduction to HTTP Responses and Requests

https://academy.zerotomastery.io/courses/1206554/lectures/31785938

# Lesson 3. HTTP Requests

https://academy.zerotomastery.io/courses/1206554/lectures/31786114

# Lesson 4. HTTP Responses

https://academy.zerotomastery.io/courses/1206554/lectures/31786263

# Lesson 5. Our First Webserver

https://academy.zerotomastery.io/courses/1206554/lectures/31786607

# Lesson 6. HTTP APIs and Routing

https://academy.zerotomastery.io/courses/1206554/lectures/31786686

# Lesson 7. Parameterized URLs

https://academy.zerotomastery.io/courses/1206554/lectures/31844063

# Lesson 8. Same Origin Policy

https://academy.zerotomastery.io/courses/1206554/lectures/31859480

Exmaple:
https://www.google.com:443/maps

Protocol: https
Host: www.google.com
Port: :443

# Lesson 9. Cross Origin Resource Sharing (CORS)

https://academy.zerotomastery.io/courses/1206554/lectures/31991755

CORS means Cross Origin Resource Sharing
Access-Control-Allow-Origin will set up the host that are aloowed to get info from your server. When the server is meant to be used to anyone the is set to: \*

# Lesson 10. POSTing Data to the server

https://academy.zerotomastery.io/courses/1206554/lectures/31991756

fetch('http://localhost:3000/friends', {
method: 'POST',
body:JSON.stringify({id: 3, name: 'Ryan Dahl'})
});

# Lesson 11. Request and Responses as stream

https://academy.zerotomastery.io/courses/1206554/lectures/32037886

fetch('http://localhost:3000/friends', {
method: 'POST',
body:JSON.stringify({id: 3, name: 'Grace Hopper'})
})
.then((response)=> response.json())
.then((friend)=> console.log(friend))

# Lesson 12. Web Servers Recap

https://academy.zerotomastery.io/courses/1206554/lectures/31991758

N: This is just an example of who works behinds the scene. We wont be using this logic, instead a framework like express.js
