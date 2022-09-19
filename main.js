const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use((request, response, next) => {
    
    console.log("1");
    next();
});

function exampleMiddleware(request, response, next) {
    console.log("2");
    next();
}

app.get('/test', (request, response) => {
    console.log("3");
});

app.post('/banan', exampleMiddleware, (request, response) => {
    console.log("3");
    response.json({
        greeting: "Hello"
    });
});

app.listen(port, () => {
    console.log("Listening on port " + port);
});