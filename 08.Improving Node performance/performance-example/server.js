const express = require('express');

const app = express();

function delay(duration){
    const startTime = Date.now();
    while(Date.now()-startTime < duration){
        // event loop is blocked
    }
}

app.get('/', (req, res)=>{
    //Example of functions that block the app
    // JSON.stringify({}) => "{}"
    //JSON.parse("{}") => {}
    // [4,5,6,7,1].sort();
    res.send(`performance example ${process.pid}`)
});

app.get('/timer', (req, res)=>{
    delay(9000)
    res.send(`Ding ding ding ${process.pid}`)
});

console.log('Running server.js...');
console.log('Worker process started')
app.listen(3000);





