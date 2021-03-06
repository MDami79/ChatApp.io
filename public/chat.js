//Make connection to server
const socket = io.connect("http://localhost:4000")

//Query DOM
  let message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback')


//Emit Events

btn.addEventListener('click', function(){
  console.log('you clicked me')
  socket.emit('chat', {
    message: message.value,
    handle: handle.value
  });

});

message.addEventListener('keypress', function(){
  socket.emit('typing', handle.value);
})

//listen for Events

socket.on('chat', function(data){
  feedback.innerHTML = "";
  output.innerHTML += '<p><strong>' + data.handle + ':</strong>' + data.message + '</p>';
})

socket.on('typing', function(data){
  feedback.innerHTML = "<p><em>"+ data + " is typing a message</em></p>"
});
