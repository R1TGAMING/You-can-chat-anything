const app = require('express')();
const { createServer } = require('http');
const { Server } = require("socket.io");

const server = createServer(app);
const io = new Server(server);


app.get( '/', (req, res) => {
  res.sendFile(__dirname + '/public/templates/index.html');
})

io.on("connection", (socket) => {
  socket.on("client-message", (msg) => {
    socket.broadcast.emit("received-message", msg)
  })
  

  console.log(socket.id)
})


app.get( '/client.js', (req, res) => {
  res.sendFile(__dirname + '/public/templates/client.js');
})

app.get( '/style.css', (req, res) => {
  res.sendFile(__dirname + '/public/templates/style.css');
})





server.listen(3000, () => {
  console.log('listening on *:3000');
})