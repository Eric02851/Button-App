const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const io = require('socket.io')(server, {cors: {origin: "*"}})

let log = []
let indexes = {}

app.get('/', (req, res) => {
    res.send('Hello World')
})

io.on('connection', (socket) => {
    let ip = socket.request.connection.remoteAddress

    for (let i = 0; i < log.length; i++) {
        if (log[i][0] == ip) {indexes[ip] = i; break}
    }
    if (indexes[ip] == undefined){
        indexes[ip] = log.length
        log.push([ip, 0])
    }

    console.log(`connected: ${ip}`)

    socket.on('click', () => {
        log[indexes[ip]][1] ++

        if (indexes[ip] != 0){
            if (log[indexes[ip]][1] > log[indexes[ip]-1][1]){
                let tmp = log[indexes[ip]-1]
                log[indexes[ip]-1] = log[indexes[ip]]
                log[indexes[ip]] = tmp
                
                indexes[ip] --
                indexes[tmp[0]] ++
            }
        }

        console.log(log)
        console.log(indexes)
    })
    socket.on('disconnect', () => {console.log(`disconnected: ${ip}`)})
})

broadcastData = () => {io.emit('data', log)}
setInterval(broadcastData, 15.625)

server.listen(420, () => {
    console.log('listening')
})
