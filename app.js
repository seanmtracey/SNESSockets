var express = require('express'), http = require('http');
var app = express();
app.set('view engine', 'jade');
app.use('/js', express.static(__dirname + '/js'));
app.use(express.bodyParser());

var server = http.createServer(app)

var io = require('socket.io').listen(server);

server.listen(8080);

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
  	sp.write(new Buffer([0x01]));
    console.log(data);
  });
});



var serialport = require("serialport");
var SerialPort = serialport.SerialPort; // localize object constructor
var sp = new SerialPort("/dev/tty.usbmodem1d11", { 
	parser: serialport.parsers.readline("\n"),
	baudrate : 57600
});

var lightOn = true;

sp.on("data", function (data) {
	io.sockets.emit('button', { button: data });
});

app.listen(3000);
