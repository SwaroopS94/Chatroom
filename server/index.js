var app = require('express')();
var events = require('events');
var eventEmitter = new events.EventEmitter();

let roomClientMapping = new Map();
let availableRooms = [];

app.get('/',(request, response)=> {
  response.header("Access-Control-Allow-Origin", "*");
  response.send("Hello Client");
});

var socket = app.listen(3000,() => {
  console.log("Listening on port : ", 3000);
});


//Todo: Adding a process env for mocks...
if(true) {
  console.log("Getting mocks : ");
  availableRooms = require('./_mock_/mock.json').availableRooms;
}




var io = require('socket.io')(socket);

io.on('connection',(socket)=> {
  console.log("New Connection");
  socket.on('message',(data) => {
    let clientData = {
      userName: "test",
      message: data.message
    };
    eventEmitter.emit('clientMessage',onClientPing(clientData,socket));
  });

  socket.on('client-join',onClientJoin);
});

function onClientPing(clientData, socket) {
  io.emit("new_message",{message: clientData.message});
  console.log("Client : ",clientData.message);
}

function onClientJoin(clientData) {
  if(clientData) {
    let roomNumber = clientData.roomNumber;
    let clients = [];
    if(!roomClientMapping.get(roomNumber)) {
      clients.push(clientData);
      roomClientMapping.set(roomNumber, clients);
    }
    else {
      roomClientMapping.get(roomNumber).push(clientData);
    }
  }
  console.log("Server emit : ",availableRooms);
  io.emit("clientJoined",availableRooms);
}