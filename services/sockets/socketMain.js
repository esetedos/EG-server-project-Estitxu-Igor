const server = require('../../index')
const io = server.socketIO;

const socketEvents = require('./socketEvents').socketEvents;
const cron = require('../cron/cronEvent.js').myCronJob;

io.on('connection', socketEvents);
io.on('connection', cron)



module.exports = io;