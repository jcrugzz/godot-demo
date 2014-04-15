var http = require('http');
var HttpProxy = require('http-proxy');

var ports = process.argv.slice(2);

var options = [
  { target: { host: 'localhost', port: ports[0] || 8080}},
  { target: { host: 'localhost', port: ports[1] || 8081}}
];

var proxy = new HttpProxy();

proxy.on('start', function (req, res, target) {
  req.time = new Date();
  console.log('proxy start at ' + req.time);

});

proxy.on('end', function (req, res, proxyRes) {
  var now = new Date();
  var respTime = now - req.time;
  console.log('proxy end at ' + now);
  console.log('response time ' + respTime + 'ms');
});

http.createServer(function (req, res) {
  var target = options.shift();
  console.log(target);
  proxy.web(req, res, target);
  options.push(target);
}).listen(4000);
