const { response, request } = require('express');
const express = require('express');
const app = express();
const port = process.env.PORT || 3005;
var cors = require('cors');
var data = require('./data');
app.use(cors());
app.get('/', (request, response) => {
    response.send('hello world');
});
app.get('/quizzes', (request, response) => {
    let metadata = data.quizzes.map(x => {
        return {name: x.name, id: x.id, picture: x.picture};
    });
    response.json(metadata);
});
app.listen(port, () => {
    
    console.log(`example app listening on port ${port}!`);
});