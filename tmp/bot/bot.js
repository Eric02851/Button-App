const io = require('socket.io-client');
const socket = io("http://73.170.84.121:420", {reconnect: true})

const click = () => {socket.emit('click')}
setInterval(click, 50)
