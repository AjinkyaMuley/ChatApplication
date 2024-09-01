import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoutes from "./routes/AuthRoutes.js";
import path from 'path';
import { fileURLToPath } from 'url';
import contactsRoutes from "./routes/ContactRoutes.js";
import setupSocket from "./socket.js";
import messagesRoutes from "./routes/MessagesRoute.js";
import channelRoutes from "./routes/ChannelRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const databaseURL = process.env.DATABASE_URL;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(cors({
     origin:[process.env.ORIGIN],
     methods:["GET","POST","PUT","PATCH","DELETE"],
     credentials:true
}))

app.use('/uploads/profile', express.static(path.join(__dirname, 'uploads/profile')));
app.use('/uploads/files', express.static(path.join(__dirname, 'uploads/files')));
 
app.use(cookieParser())
app.use(express.json())

app.use('/api/auth',authRoutes)
app.use('/api/contacts',contactsRoutes)
app.use('/api/messages',messagesRoutes)
app.use('/api/channel',channelRoutes)


// --------------------------DEPLOYEMENT---------------

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === 'production'){

    app.use(express.static(path.join(__dirname1,'/frontend/dist')))

    app.get('*',(req,res) => {
        res.sendFile(path.resolve(__dirname1,'client','dist','index.html'))
    })
}
else{
    app.get('/',(req,res) => {
        res.send('API running succesfully');
    })
}

// --------------------------DEPLOYEMENT---------------

const server = app.listen(port,()=>{
    console.log(`Server is running on port 3000`)
})

setupSocket(server)

mongoose.connect(databaseURL)
    .then(()=>console.log('DB connection succesfull'))
    .catch(err=>console.log(err.message))