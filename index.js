const express = require("express")
const http = require("node:http")
const socket = require("socket.io")
const path = require("node:path")

const app = express()
const PORT = process.env.PORT || 8000

const server  = http.createServer(app)
//we got the instance not and object
const io = socket(server)

app.set("view engine","ejs")
app.use(express.static(path.join(__dirname,"public")))

//inorder to get the connection from the frontend first we have to render the frontend file then it will make a request
//in our case we sending the file res.render("index")

io.on("connection",(socket)=>{
    socket.on("send-location",function(data){
        io.emit("receive-location",{id: socket.id, ...data})
    })
    console.log("user connected!!")
    socket.on("disconnect",function(){
        io.emit("user-disconnected",socket.id)
    })
})

app.get("/",(req,res)=>{
    return res.render("index")
})

server.listen(PORT,()=>{
    console.log(`server is running at Port ${PORT}`)
})
