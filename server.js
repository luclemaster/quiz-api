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
    response.send(data.scores);
});
app.get('/quizzes', (request, response) => {
    let metadata = data.quizzes.map(x => {
        return {name: x.name, id: x.id, picture: x.picture};
    });
    response.json(metadata);
});
app.get('/quiz/:id', (request, response) => {
    let searchFor = request.params.id;
    let found = data.quizzes.find(x => x.id == searchFor);
    if(found) {
        response.json(found);
    }
    else{
        response.status(404).json({error: `The question ${searchFor} could not be found`});
    }
});
app.listen(port, () => {

});
app.post('/score', (request, response) => {
    let username = request.body.username;
    let quizid = request.body.quizid;
    let score = request.body.score;
    data.scores.push({score: score, quizid: quizid, username: username});
    response.json({message: `The score was added successfully`});
});