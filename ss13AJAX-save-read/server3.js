var express = require('express');
var app = express();
const PORT =8081;

app.get('/', function (req, res) {
    res.send( "This is my answer" );
    return;
});

//############################################################
let arraySurveyData = [{'name':'Elric', 'rating': 1, 'comment': 'This is a comment'}, {'name':'Hopper', 'rating': 2, 'comment': "I'm a cat"}];

app.get('/setSurvey', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');    

    let name = req.query.name;
    let rating = req.query.rating;
    let comment = req.query.comment;
    let objSurvey = {'name':name, 'rating': rating, 'comment': comment };
    arraySurveyData.push(objSurvey);
    res.send( "Answer added!!" );
    return;
});


app.get('/getSurvey', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');    
    res.send( JSON.stringify(arraySurveyData) );
    return;
});
//############################################################



var server = app.listen(PORT, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
 console.log(`Server running at http://127.0.0.1:${PORT}/`);