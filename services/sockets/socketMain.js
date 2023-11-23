const server = require('../../index')
const io = server.socketIO;

const socketEvents = require('./socketEvents').socketEvents;

io.on('connection', socketEvents);


// var messages = [
//   {
//     author: "Carlos",
//     text: "Hola! que tal?",
//   },
//   {
//     author: "Pepe",
//     text: "Muy bien! y tu??",
//   },
//   {
//     author: "Paco",
//     text: "Genial!",
//   },
// ];

// io.on("connection", function (socket) {
//     console.log("Un cliente se ha conectado");
//     socket.emit("messages", messages);
//   });

module.exports = io;