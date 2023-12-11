require('dotenv').config();

const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const mongodbRoute = process.env.DATABASE_URL
const { initializeApp } = require('firebase-admin/app');
const admin = require('firebase-admin')

//sockets
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);

const cron = require('node-cron');
const schedule = require('node-schedule');

const myCronJob = require('./services/cron/cronEvent')

admin.initializeApp({
    credential: admin.credential.cert({
        "project_id": process.env.FIREBASE_PROJECT_ID,
        "private_key": process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        "client_email": process.env.FIREBASE_CLIENT_EMAIL
    }),
})

const userRouter = require('./src/routes/userRoutes')
const ingredientRouter = require('./src/routes/ingredientRoutes')
const artifactRouter = require('./src/routes/artifactRoutes')
const searchRouter = require('./src/routes/searchRoutes')

app.use(bodyParser.json());

app.use('/api/users', userRouter)
app.use('/api/ingredients', ingredientRouter)
app.use('/api/artifacts', artifactRouter)
app.use('/api/search', searchRouter)



async function start(){
    try{
        await mongoose.connect(mongodbRoute);
        server.listen(port, () => {
            console.log(`Server activo en ${port}`);
        });
        console.log('Conexión con Mongo correcta')

        cron.schedule('*/2 * * * *', myCronJob); //cada 2min
    }
    catch(error){
        console.log('Error al conectar en la base de datos')
    }
}

start();

const io = socketIO(server, {
	pingTimeout: 30000,
	cors: {
		origin: '*',
	}
});
exports.socketIO = io;

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
})

app.get('/', (req, res) => {
    res.send('Welcome to Absentia Socket Service')
})



require('./services/sockets/socketMain');