## Sockets with Nodejs

code source:
https://github.com/odziem/multiplayer-pong

# Lesson 1. Introduction to Sockets

https://academy.zerotomastery.io/courses/1206554/lectures/27224588

# Lesson 2. Polling

https://academy.zerotomastery.io/courses/1206554/lectures/27224586

# Lesson 3. What is a Socket?

https://academy.zerotomastery.io/courses/1206554/lectures/27224587

# Lesson 4. Sockets VS Polling

https://academy.zerotomastery.io/courses/1206554/lectures/27302743

# Lesson 5. WebSockets

https://academy.zerotomastery.io/courses/1206554/lectures/27302741

# Lesson 6. Introduction to socket.io

https://academy.zerotomastery.io/courses/1206554/lectures/27302742

# Lesson 7. socket.io Client and Server APIs

https://academy.zerotomastery.io/courses/1206554/lectures/27337563

# Lesson 8. Multiplayer Pong Overview

https://academy.zerotomastery.io/courses/1206554/lectures/27337564

# lesson 9. Reviewing Our Pong Front End

https://academy.zerotomastery.io/courses/1206554/lectures/27366084

# Lesson 10. Multiplayer Pong Message Sequence

https://academy.zerotomastery.io/courses/1206554/lectures/27368296

# Lesson 11. Setting Up a socket.io Server

https://academy.zerotomastery.io/courses/1206554/lectures/27368297

npm init
pakgage name: multi-player-pong
entry point: server.js

npm install --save socket.io

# Lesson 12. Connecting to socket.io

https://academy.zerotomastery.io/courses/1206554/lectures/27381001

in HTML, add this script to connect socket.io:

<script src="https://cdn.socket.io/4.6.0/socket.io.min.js" integrity="sha384-c79GN5VsunZvi+Q/WObgk2in0CbZsHnjEqvFxC5DxHn9lTfNce2WW6h2pH6u/kF+" crossorigin="anonymous"></script>

The tutorial recomends this code, to deal witht the restriction from Google (CORS):
const io = require('socket.io')(server, {
cors: {
origin: 'http://localhost:3000',
methods: ['GET', 'POST']
}
});

- Nevertheless, it did not work for me, I used this is one, instead:

const io = require('socket.io')(server, {
cors: {
origin: '\*',
methods: ['GET', 'POST']
}
});

# Lesson 13. Identifying Connected Clients

https://academy.zerotomastery.io/courses/1206554/lectures/27419641

# Lesson 14. Listening for Events in the Pong Server

https://academy.zerotomastery.io/courses/1206554/lectures/27456625

# Lesson 15. Listening for Events in the Pong Server

https://academy.zerotomastery.io/courses/1206554/lectures/27456626

# Lesson 16. Handling Events in the Pong Client

https://academy.zerotomastery.io/courses/1206554/lectures/27419640

# Lesson 17. Implementing the Game Logic: Paddle

https://academy.zerotomastery.io/courses/1206554/lectures/27419639

# Lesson 18. Implementing the Game Logic: Ball

https://academy.zerotomastery.io/courses/1206554/lectures/27895697

# Lesson 19. What Happens When You Disconnect?

https://academy.zerotomastery.io/courses/1206554/lectures/30869936

# Lesson 20. Using Socket.io with Express

https://academy.zerotomastery.io/courses/1206554/lectures/27802284

npm install --save express

# Lesson 21. Namespaces

https://academy.zerotomastery.io/courses/1206554/lectures/27802285

# Rooms

https://academy.zerotomastery.io/courses/1206554/lectures/30870350

N: Game is not starting for some reason but i' am done with this part.
