var http = require('http');
var fs = require('fs');
var Transform = require('stream').Transform;
var godot = require('godot');

var port = +process.argv.slice(2)[0] || 8080;

var client = godot.createClient({
  type: 'tcp'
});

client.on('error', function (err) {
  console.log('You should start the godot server because we ' + err.message);
});

client.connect(1337);

http.createServer(function (req, res) {
  var stream;

  if (req.url === '/') {
    stream = fs.createReadStream('plain.txt');
    stream.pipe(res);
    return;
  }
  if (req.url === '/random') {
    client.produce({
      service: 'demo/log',
      description: 'we hit the random endpoint'
    })
    stream = fs.createReadStream('/dev/urandom');
    stream.pipe(randomTransform()).pipe(res, { end: false });
    setTimeout(function () {
      res.end();
    }, 10000);
    return;
  }
  // If we do not have a route for this then just end
  res.writeHead(404);
  res.end('Not Found\n');

}).listen(port, function () {

});

function randomTransform () {
  var transform = new Transform();

  transform._transform = function (chunk, enc, cb) {
    chunk = chunk.toString('hex');

    transform.push(chunk);

    setTimeout(cb, 2000);
  }
  return transform;
}
