var http = require("http");
let port = 8083;

http.createServer(function (request, response) {
    // Send the HTTP header 
    // HTTP Status: 200 : OK
    // Content Type: text/plain
    console.log(request.url);
    if (request.url.startsWith('/hello')) {
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.writeHead(200, {'Content-Type': 'text/plain'});
    
        // Send the response body as "Hello World"
        response.write('Hello World\n');
        response.end();
    }else if (request.url.startsWith('/aboutus')) {
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.writeHead(200, {'Content-Type': 'text/plain'});
    
        // Send the response body as "Hello World"
        response.write('<h1 style="color: blue">We are students</h1>');
        response.end();
    }else{
        response.write('Invalid request');
        response.end();
    }
 }).listen(port);
 
 // Console will print the message
 console.log(`Server running at http://127.0.0.1:${port}/`);