var http = require('http');
var urlParser = require("url");

var server = http.createServer(function(req, res){
  var url = urlParser.parse(req.url);
  var path = url.path.replace(/^\/+|\/+$/g, '');

  var routeHandler = routes[path] || routes.notFound;
  routeHandler(function(statusCode, payload){

    res.setHeader("Content-Type", "application/json");
    res.writeHead(statusCode);
    res.end(JSON.stringify(payload));
  });

});
var handler = {
  helloWorld: function(callback){
    callback(200, {message: "Welcome to my assignment!"});
  },
  notFound: function(callback){
    callback(404);
  },
};

var routes = {
  "hello":handler.helloWorld,
  notFound: handler.notFound
};

server.listen(3000, function(){
  console.log("Server is listening on port 3000");
});
