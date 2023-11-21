
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const mongodbRoute = process.env.DATABASE_URL;
const { initializeApp } = require('firebase-admin/app');
const admin = require('firebase-admin')



const userRouter = require('./routes/userRoutes')
const ingredientRouter = require('./routes/ingredientRoutes')


const app = express();
const PORT = process.env.PORT || 3000;

admin.initializeApp({
    credential: admin.credential.cert({
        "project_id": process.env.FIREBASE_PROJECT_ID,
        "private_key": process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        "client_email": process.env.FIREBASE_CLIENT_EMAIL
    }),
})

app.use(bodyParser.json());

app.use('/api/users', userRouter)

app.use('/api/ingredients', ingredientRouter)


async function start(){
    try{
        await mongoose.connect(mongodbRoute);
        app.listen(PORT, () => {
            console.log(`API is listening on port ${PORT}`)
        })
    }
    catch(error){
        console.log('Error al conectar en la base de datos')
    }
}

start();
