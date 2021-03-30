var express = require('express');
var app = express();
const PORT =8081;

app.get('/', function (req, res) {
    res.send( "This is my answer" );
    return;
});

let data = [1,2,3,4];
app.get('/listUsers', function (req, res) {
    console.log( data );
    res.send( data );
    return;
});

app.get('/helloText', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    let name = req.query.name;
    let lastname = req.query.lastname;
    res.send( 'helloooo '+name + " - "+ lastname );
    return;
});

app.get('/hello', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    let name = req.query.name;
    let lastname = req.query.lastname;
    res.send( JSON.stringify({msg:'helloooo '+name}) );
    return;
});

app.get('/getBusData', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    let dataToSend = '<div><input type="button" value="click me!!"/><img src="img/map-tx.png" alt="Map of Texas" /></div>';
    res.send( dataToSend );
    return;
});



var server = app.listen(PORT, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
 console.log(`Server running at http://127.0.0.1:${PORT}/`);