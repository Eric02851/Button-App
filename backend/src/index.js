const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const io = require('socket.io')(server, {cors: {origin: "*"}});

app.get('/', (req, res) => {
    res.send('Hello World')
})

io.on('connection', (socket) => {
    console.log('connected')

    socket.on('disconnect', () => {
        console.log('user disconnected')
      })

    socket.on('message', (msg) => {
        console.log(msg)
    })
})

server.listen(420, () => {
    console.log('listening')
})