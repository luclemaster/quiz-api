const { response, request } = require('express');
const express = require('express');
const app = express();
const port = process.env.PORT || 3005;
var cors = require('cors');
var data = require('./data');
var bodyParser = require('body-parser')
app.use(cors());
app.use(bodyParser.json());

app.get('/', (request, response) => {
    response.send("Welcome to quiz api");
});
app.get('/quizzes', (request, response) => {
    let metadata = data.quizzes.map(x => {
        return {name: x.name, id: x.id, picture: x.picture};
    });
    response.json(metadata);
});
app.listen(port, () => {
    response.send(data.scores);
});
app.post('/score', (request, response) => {
    let username = request.body.username;
    let quizid = request.body.quizid;
    let score = request.body.score;
    data.scores.push({score: score, quizid: quizid, username: username});
    response.json({message: `The score was added successfully`});
});