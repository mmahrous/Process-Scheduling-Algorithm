var net = require('net');
//var ps = [{name: 'ps3', arrivalTime: 2, brustTime: 9, priority: 2},{name: 'ps1', arrivalTime: 0, brustTime: 8, priority:  3}, {name: 'ps2', arrivalTime: 1, brustTime: 4, priority:  5}, {name: 'ps4', arrivalTime: 3, brustTime: 5, priority:  1}];
//var ps = [{name: 'ps3', arrivalTime: 2, brustTime: 7, priority: 2},{name: 'ps1', arrivalTime: 0, brustTime: 6, priority:  3}, {name: 'ps2', arrivalTime: 1, brustTime: 8, priority:  5}, {name: 'ps4', arrivalTime: 3, brustTime: 3, priority:  1}];
//var ps = [{name: 'ps3', arrivalTime: 2, brustTime: 2, priority: 4},{name: 'ps1', arrivalTime: 0, brustTime: 10, priority:  3}, {name: 'ps2', arrivalTime: 1, brustTime: 1, priority:  1}, {name: 'ps4', arrivalTime: 3, brustTime: 1, priority:  5}, {name: 'ps5', arrivalTime: 3, brustTime: 5, priority:  2}];
var ps = [{name: 'ps3', arrivalTime: 10, brustTime: 3, priority: 2},{name: 'ps1', arrivalTime: 0, brustTime: 24, priority:  3}, {name: 'ps2', arrivalTime: 5, brustTime: 3, priority:  5}];
var client = net.connect({port: 8124},
    function() { //'connect' listener
  console.log('connected to server!');
  client.write(JSON.stringify(ps));
});
client.on('data', function(data) {
  console.log(JSON.parse(data.toString()));
  client.end();
});
client.on('end', function() {
  console.log('disconnected from server');
});

