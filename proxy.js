var http = require('http');
var HttpProxy = require('http-proxy');
var godot = require('godot');

var client = godot.createClient({
  type: 'tcp',
  reconnect: {}
});

client.on('error', function (err) {
  console.log('error connecting to godot from proxy');
});

client.on('reconnect', function (backoff) {
  console.log('Running reconnect to godot');
});

client.connect(1337);
var ports = process.argv.slice(2);

var options = [
  { target: { host: 'localhost', port: ports[0] || 8080}},
  { target: { host: 'localhost', port: ports[1] || 8081}}
];

var proxy = new HttpProxy();

proxy.on('start', function (req, res, target) {
  req.time = new Date();
  req.target = [target.host, target.port].join(':');
  console.log('proxy start at ' + req.time);
  client.produce({
    host: req.target,
    service: 'http/start',
    description: 'Proxy start'
  });
});

proxy.on('end', function (req, res, proxyRes) {
  var now = new Date();
  var respTime = now - req.time;
  console.log('proxy end at ' + now);
  console.log('response time ' + respTime + 'ms');
  client.produce({
    host: req.target,
    service: 'http/end',
    description: 'Proxy end'
  });

  client.produce({
    host: req.target,
    service: 'http/response-time',
    description: 'Response time!',
    metric: respTime
  })
});

http.createServer(function (req, res) {
  var target = options.shift();
  proxy.web(req, res, target);
  options.push(target);
}).listen(4000);
