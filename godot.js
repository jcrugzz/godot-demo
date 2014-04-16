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
        .pipe(godot.by('host', function (stream) {
          return stream
            .pipe(godot.console(function (data) {
              console.log(data.metric + 'ms response time to ' + data.host);
            }))
            .pipe(godot.mean())
            .pipe(godot.console(function (data) {
              console.log(data.metric + 'ms average response time to ' + data.host)
            }))
        }))
    }
  ]
})

server.listen(1337);
