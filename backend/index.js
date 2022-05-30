const http = require('http')
const static = require('node-static');
const mongo = require('mongodb').MongoClient

const build = new(static.Server)(__dirname.split('backend')[0] + 'frontend/build')
const server = http.createServer(function (req, res) {build.serve(req, res)})
const io = require('socket.io')(server, {cors: {origin: "*"}})

let userData = []
let index = {}
let collection

io.on('connection', (socket) => {
    let ip = socket.request.connection.remoteAddress
    console.log(`connected: ${ip}`)
    if (index[ip] == undefined){
        index[ip] = userData.length
        userData.push([ip, 0])
    }

    socket.on('click', () => {
        userData[index[ip]][1] ++

        if (index[ip] != 0){
            if (userData[index[ip]][1] > userData[index[ip]-1][1]) {
                let tmp = userData[index[ip]-1]
                userData[index[ip]-1] = userData[index[ip]]
                userData[index[ip]] = tmp

                index[ip] --
                index[tmp[0]] ++
            }
        }

        console.log(userData)
        console.log(index)
    })

    socket.on('disconnect', () => {console.log(`disconnected: ${ip}`)})
})

const broadcastData = () => {io.emit('data', userData)}

const loadData = async () => {
    const client = await mongo.connect('mongodb://127.0.0.1:27017')
    collection = client.db('buttonApp').collection('userData')

    let data = await collection.find().toArray()
    data = data[0]

    if (data != undefined) {
        delete data._id
        for (let i in data) {
            console.log(i)
            userData.push([i, data[i]])
        }
    }
}

const indexData = () => {
    for (let i in userData) {
        index[userData[i][0]] = parseInt(i)
    }
}

const logData = async () => {
    let userDataLiteral = {}
    for (let i in userData) {
        userDataLiteral[userData[i][0]] = userData[i][1]
    }

    console.log(userDataLiteral)

    await collection.deleteMany({})
    await collection.insertOne(userDataLiteral)
    console.log("Logged User Data")
}

const main = async () => {
    await loadData()
    indexData()
    //console.log(userData)
    //console.log(index)

    setInterval(broadcastData, 15.625)
    setInterval(logData, 5000)

    server.listen(420, '::', () => {
        console.log('listening')
    })

    server.listen(80, '::')
}

main()
