const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);



app.get( '/', (req, res) => {
  res.sendFile(__dirname + '/public/templates/index.html');
})

io.on('connection', (socket) => {
  socket.on('chat-client', (chat) => {
    socket.emit("chat-server", chat)
  })
})


server.listen(3000, () => {
  console.log('listening on *:3000');
})