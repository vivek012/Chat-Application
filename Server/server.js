import express from 'express';
import "dotenv/config";
import cors from "cors";
import http from "http"
import { connectDB } from './lib/db.js';
import { Server } from "socket.io";
import userRouter from  './Routes/userRoutes.js'
import messageRouter from './Routes/messageRoutes.js';


// Create Express app and HTTP Server
let app = express()
const server = http.createServer(app);

// Initialize Socket.io server 
export const io = new Server(server, {
    cors: {
        origin: "*"
    }
})

// store online users  
export const userSocketMap = {};

// Socket io connection handler
io.on('connection', (socket)=>{
    const userId= socket.handshake.query.userId;
    console.log('userId Connected', userId);

    if(userId) userSocketMap[userId]= socket.id;
    
    //emit online users to all connected cients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", ()=>{
        console.log("User Disconnected", userId);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers" , Object.keys(userSocketMap))
    })

})


// Middleware Setup
app.use(express.json({limit: "4mb"}))
app.use(cors()); 

app.use("/api/status", (req, res)=>{
    res.send("Server is running")
})

// Routers
app.use("/api/auth", userRouter)
app.use("/api/messages" , messageRouter)

// connect  to  mongodb database
await connectDB();

// Start Server 


    const PORT =  3000;
    server.listen(PORT, ()=>{
        console.log("Server has  running on PORT: " + PORT);
        
    })


// export server for vercel
export default server;