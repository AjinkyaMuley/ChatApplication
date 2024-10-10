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

// Update CORS configuration for production
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? process.env.ORIGIN 
        : "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
}));

// Static file serving
app.use('/uploads/profile', express.static(path.join(__dirname, 'uploads/profile')));
app.use('/uploads/files', express.static(path.join(__dirname, 'uploads/files')));

app.use(cookieParser())
app.use(express.json())

// API routes
app.use('/api/auth', authRoutes)
app.use('/api/contacts', contactsRoutes)
app.use('/api/messages', messagesRoutes)
app.use('/api/channel', channelRoutes)

// Remove the deployment section since Vercel handles it differently
// Instead, just serve the API endpoints

app.get('/', (req, res) => {
    res.send('API running successfully');
});

// Connect to MongoDB
mongoose.connect(databaseURL)
    .then(() => console.log('DB connection successful'))
    .catch(err => console.log(err.message))

// For local development
if (process.env.NODE_ENV !== 'production') {
    const server = app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    });
    setupSocket(server);
}

// For Vercel
export default app;