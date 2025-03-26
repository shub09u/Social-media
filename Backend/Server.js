const express=require('express')
const cookieParser = require('cookie-parser')
const app=express()
const port=8090
const server = require('http').createServer(app);
const cors=require('cors')

const connecttodb=require('./config/db')
connecttodb()
require('dotenv').config()

const userouter=require('./Route/Userrouter')
const Postrouter=require('./Route/Postrouter')
const chatRoutes=require('./Route/chatRoutes')


app.use(cors({
    origin: 'https://localhost:3000',  // Frontend URL
    credentials: true                 // Allow credentials (cookies, headers)
}));


const io = require('socket.io')(server);

app.use(express.json())
app.use(cookieParser())



app.set('view engine','ejs')

app.get('/',(req,res)=>{

res.send('welcome Home')
})
app.use('/user',userouter)
app.use('/posts',Postrouter)
app.use('/chat',chatRoutes)

let users = new Map()


function deleteByvalue(value){
for(let [key,val] of users){
if(val === value){
users.delete(key)

return users
}
}

}
io.on('connection', socket => {
    console.log('connection is established', socket.id)
    socket.on('newUser', (id) => {
        console.log(id)
        users.set(id,socket.id);
        console.log(users)
    })
    socket.on('sendMessage',({userId,friendId,text})=>{
        console.log(userId)
        console.log("friendId",friendId)
        let friendSocketId = users.get(friendId)
        console.log("friendSocketId", friendSocketId)
        if(friendSocketId){
            socket.to(friendSocketId).emit('recievedMsg',{userId,friendId,text})
        }
        console.log(text)

})
socket.on('disconnect',()=>{
console.log('user disconnected',socket.id);
let updatedUser=deleteByvalue(socket.id)
console.log(updatedUser)


})

});

server.listen(port,()=>{
console.log(`server is running on port ${port}`);


})