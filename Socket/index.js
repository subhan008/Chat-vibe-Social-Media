const io = require('socket.io')(8800,{
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });
  
let activeUsers = []
let messageData = {}
io.on("connection",socket => {
    /*add new user*/
    socket.on('new-user-add',(newUserId)=>{
        if(!activeUsers.some((user)=> user.userId === newUserId)){
            console.log('mjmjmjmm');
            activeUsers.push({
                userId:newUserId,
                socketId:socket.id  
            })     
        }      
    /*sent message*/
    socket.on('sent-message',(data)=>{
        console.log('llllll',data);      
        messageData = data.messageData
               
        const user = activeUsers.find((element)=> element.userId == data.receiverId)
        console.log('Senting data to user :',data.receiverId); 
        if(user){           
            console.log('herreeeeeeeee');
            io.to(user.socketId).emit('receive-message' , messageData) 
        } 
    })    
       
        console.log('Connected Users', activeUsers);
    io.emit('get-users',activeUsers)
    })  
      
}) 