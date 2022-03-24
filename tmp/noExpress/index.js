const server = require('http').createServer()
const io = require('socket.io')(server, {cors: {origin: "*"}});

let log = {}

io.on('connection', (socket) => {
    let ip = socket.request.connection.remoteAddress
    if (log[ip] == undefined) {log[ip] = 0}
    console.log('connected')
    console.log(log)

    socket.on('disconnect', () => {
        if (log[ip] == 0) {delete log[ip]}
        console.log('disconnected')
        console.log(log)
      })

    socket.on('click', () => {
        log[ip] ++
        console.log(log)
    })
})

server.listen(420, () => {
    console.log('listening')
})
