var godot = require('godot');

var server = godot.createServer({
  type: 'tcp',
  reactors: [
    function (socket) {
      return socket
        .pipe(godot.where('service', '*/log'))
        .pipe(godot.console())
    },
    function (socket) {
      return socket
        .pipe(godot.where('service', '*/response-time'))
        .pipe(godot.mean())
    }
  ]
})

server.listen(1337);
