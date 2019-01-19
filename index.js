const http = require('http');
const url = require('url');
const portNumber = 5050;

// Dependencies (Localy)
const routers = require('./config/router');

const server = http.createServer((req, res) => {
  let parsedUrl = url.parse(req.url, true);
  //   console.log('Parse URL', parsedUrl);
  let path = parsedUrl.pathname;
  console.log(path);
  let trimmedPath = path.replace('/^/+|/+$/g', '');

  req.on('data', data => {
    console.log('Data', data);
  });

  req.on('end', function() {
    console.log('End Request Received', trimmedPath);
    var chosenHandler =
      typeof routers[trimmedPath] !== 'undefined'
        ? routers[trimmedPath]
        : routerHandlers.routeNotFound;
    console.log('Chosen Handler', chosenHandler);
    var data = {
      trimmedPath: trimmedPath
    };
    // Route the request
    chosenHandler(data, function(statusCode, payload) {
      statusCode = typeof statusCode == 'number' ? statusCode : 200;
      console.log('status code', statusCode);
      payload = typeof payload == 'object' ? payload : {};
      console.log('payload', payload);
      var payloadString = JSON.stringify(payload);
      res.end(payloadString);
      console.log('End');
    });
  });
});

server.listen(portNumber, () => {
  console.log('Server Started..');
});

var routerHandlers = {};

routerHandlers.hello = (data, callback) => {
  const welcomeMessage = {
    Message: 'Welcome !'
  };
  callback(200, welcomeMessage);
};

routerHandlers.routeNotFound = (data, callback) => {
  callback(404);
};

var router = {
  '/hello': routerHandlers.hello
};
