const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const io = require('socket.io')(server, {cors: {origin: "*"}})

let log = []

app.get('/', (req, res) => {
    res.send('Hello World')
})

io.on('connection', (socket) => {
    let ip = socket.request.connection.remoteAddress
    let index = -1;
    
    for (let i = 0; i < log.length; i++) {
        if (log[i][0] == ip) {index = i; break}
    }
    if (index == -1) {
        log.push([ip, 0])
        index = log.length - 1
    }
    console.log(`connected: ${ip}`)

    socket.on('click', () => {
        log[index][1] ++
        console.log(log)
    })
    socket.on('disconnect', () => {console.log(`disconnected: ${ip}`)})
})

broadcastData = () => {io.emit('data', log)}
setInterval(broadcastData, 15.625)

server.listen(420, () => {
    console.log('listening')
})
