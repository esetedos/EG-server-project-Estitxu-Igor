const server = require('../../index')
const io = server.socketIO;

const socketEvents = require('./socketEvents').socketEvents;

io.on('connection', socketEvents);



module.exports = io;