const express = require('express');
const app = express();
const http = require('http');
const { Server} = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
     origin: "http://localhost:5173",
     methods: ["GET", "POST"],   
    }
});

io.on("connection", (socket)=>{
    console.log(`User connected: ${socket.id}`);

    //This is for multiple users joining a room
    socket.on("join_room", (data)=>{
        socket.join(data);
    })

    // socket.on("sendMessage", (data)=>{
    //     // console.log(data);
    //     socket.broadcast.emit("receive_message", data)
    // });
    
    socket.on("sendMessage", (data)=>{
        // console.log(data);
        socket.to(data.room).emit("receive_message", data)
    });
})

server.listen(3000, ()=>{
    console.log("Server is running on " + server.port);
})