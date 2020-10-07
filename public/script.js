var socket= io.connect('http://localhost:9090')

var message = document.querySelector("#message");
var btn = document.querySelector("#send");
var output  = document.querySelector("#output");

socket.on('connect', function(){
    socket.emit('adduser', prompt("What's your name?"));
});

btn.addEventListener('click', function() {
    socket.emit('sendchat', message.value);
});

socket.on('updatechat',function(username, data) {
    output.innerHTML+="<p><strong>" + username + ":</strong>" + data + "</p>";
});

function switchRoom(room) {
    socket.emit('switchRoom', room);
}

socket.on('updaterooms', function(rooms, current_room) {
    $('#rooms').empty();
    $.each(rooms, function(key, value) {
        if(value == current_room){
            $('#rooms').append('<div>' + value + '</div>');
        }
        else {
            $('#rooms').append('<div><a href="#" onclick="switchRoom(\''+value+'\')">' + value + '</a></div>');
        }
    });
});


	
