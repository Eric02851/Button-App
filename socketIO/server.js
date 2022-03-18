const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
    let client_ip_address = socket.request.connection.remoteAddress
    console.log(client_ip_address)
})

server.listen(420, "2601:646:8380:3ac0:8c6e:87e1:813c:d17b", () => {
  console.log('listening on *:3000')
})