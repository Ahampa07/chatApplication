var express = require('express');
const { emit } = require('nodemon');
var app = express();

var server = app.listen(9090, function(){
  console.log('Listening on port 9090');  
})

app.use(express.static("public"));

var socket= require('socket.io');

var io = socket(server);

var usernames = {};

var rooms =['office','home'];

io.on("connection", function(socket) {
    console.log('Socket connection made ' + socket.id);

    socket.on('adduser',function(username) {        
       socket.username=username;
       socket.room= 'office';
       usernames[usernames]=usernames;
       socket.join('office');
       socket.emit('updatechat','SERVER','you have connected to office');
       socket.broadcast.to('office').emit('updatechat','SERVER',username+' has connected');
       socket.emit('updaterooms',rooms, 'office');
    });

    socket.on('sendchat', function (data) {
      io.sockets.in(socket.room).emit('updatechat', socket.username, data);
    });
    
    socket.on('switchRoom',function(newroom) {
      socket.leave(socket.room);
      socket.join(newroom);
      socket.emit('updatechat','SERVER', 'you have connected to ' +newroom);
      socket.broadcast.to(socket.room).emit('updatechat','SERVER', socket.username+' has left this room');
      socket.room=newroom;
      socket.broadcast.to(newroom).emit('updatechat','SERVER', socket.username+' has joined this room');
      socket.emit('updaterooms',rooms,newroom);
    })
  
    
    
    // socket.on('disconnect', function(){
    //   // remove the username from global usernames list
    //   delete usernames[socket.username];
    //   // update list of users in chat, client-side
    //   io.sockets.emit('updateusers', usernames);
    //   // echo globally that this client has left
    //   socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
    //   socket.leave(socket.room);
    // });
});


