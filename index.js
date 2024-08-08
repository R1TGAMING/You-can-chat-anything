const app = require('express')();
const { createServer } = require('http');
const { Server } = require("socket.io");
const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv = require('dotenv').config()

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

client.connect()

const db = client.db('Chat')

const server = createServer(app);
const io = new Server(server);


app.get( '/', (req, res) => {
  res.sendFile(__dirname + '/public/templates/index.html');
})

io.on("connection", (socket) => {
  socket.on("client-message", (msg, dates, time) => {
    socket.broadcast.emit("received-message", msg, dates, time);
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