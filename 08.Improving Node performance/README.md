## Improve Node performance

Code for this section:
https://github.com/odziem/performance-example

# Lesson 1. Node server performance

https://academy.zerotomastery.io/courses/1206554/lectures/31731082

# Lesson 2. Building a simple blocking Function

https://academy.zerotomastery.io/courses/1206554/lectures/31763681

delay function we are simulating the extreme case of blocking behaviour

# Lesson 3. Real Life Blocking functions

https://academy.zerotomastery.io/courses/1206554/lectures/31731723

# Lesson 4. Running multiple node processes

https://academy.zerotomastery.io/courses/1206554/lectures/31740833

# Lesson 5. The Node cluster module

https://academy.zerotomastery.io/courses/1206554/lectures/31740905

# Lesson 6. Cluster module in Action

https://academy.zerotomastery.io/courses/1206554/lectures/31740923

- This is called: <Round Robin>

N: JavaScript is a single thread so when blocking functions are running, one function nees to wait for the other to finish. This is solved by cluster which assigs workers (forks) and the the process run simuntanously

if(cluster.isMaster){
console.log('Master has been started');
cluster.fork();
cluster.fork();
} else{
console.log('Worker process started')
app.listen(3000);
}

# Lesson 7. Maximixing Cluster performance

https://academy.zerotomastery.io/courses/1206554/lectures/31750880

if(cluster.isMaster){
console.log('Master has been started');
const NUM_WORKERS = os.cpus().length;
for(let i = 0; i < NUM_WORKERS; i++){
cluster.fork();
}

} else{
console.log('Worker process started')
app.listen(3000);
}

N: For loop to create the amount of workers (fork) that the CPU allos us to have

# Lesson 8. Load balancing

https://academy.zerotomastery.io/courses/1206554/lectures/31751468

# Lesson 9. The PM2 tool

https://academy.zerotomastery.io/courses/1206554/lectures/31751678

PM2 stands for Advance Production Manager for Nodejs. Info about it could be find in thies website:
https://pm2.keymetrics.io

This uses the cluster mode that we learn in previous lessons.

# Lesson 10. Using PM2

https://academy.zerotomastery.io/courses/1206554/lectures/31763959

npm install pm2

N: In this lesson is installed globally in oder to demostraste de features

# Lesson # 11. Live cluesters

https://academy.zerotomastery.io/courses/1206554/lectures/31764544

in a terminal outside VSCode. Get to the folder with the project and run
pm2 monit

This help us to check how our CPUs are using the energy when a request is done

# Lesson 12. Zero Downtime Restart

https://academy.zerotomastery.io/courses/1206554/lectures/31773062

pm2 reload server

- This is the best way to update servers that are already live and serving users particulary with applications that are time sensitive

# Lesson 13. Improving performance in pir Nasa project

https://academy.zerotomastery.io/courses/1206554/lectures/31796362

1.  Install pm2 in the server
    cd server
    npm run pm2

2.  Script to start pm2.
    package.json in nasa-project/server

            "cluester": "pm2 start src/server.js -i max"

    N: -i max. Means that we get the max amount of worker in the cluster.

3.  Write script in root package.jon to run mp2

    "deploy-cluster": "npm run build --prefix client && npm run cluster --prefix server",

# Lesson 14. Worker threads

https://academy.zerotomastery.io/courses/1206554/lectures/31996295

# Lesson 15. Workers thread in action

https://academy.zerotomastery.io/courses/1206554/lectures/31996298

H: This is a builtin module in node that allows us to execute JavaScript in parallel. To visualise, it was created the folder: threads-example

N: A lot of bla bla bla... what is important is to set up pm2 in our project for effiency!
