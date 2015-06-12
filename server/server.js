var net = require('net');
var ps = require('./functions/ps');
var server = net.createServer(function(c) { //'connection' listener
  console.log('client connected');
  c.on('data', function(data) {
  	var data = JSON.parse(data.toString());
	data = ps.RR(data, 4);
	c.write(JSON.stringify(data));
  });
  c.on('end', function() {
    console.log('client disconnected');
  });
});
server.listen(8124, function() { //'listening' listener
  console.log('server bound');
});