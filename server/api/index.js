const express = require('express');
const app = express();
const PORT = 5000;
const cors = require('cors')
require('dotenv').config({path:'./backend/.env'})

const Document = require('../model/Document.js')

const {createServer} = require('http')
app.use(cors())
const httpServer = createServer(app)

const io = require('socket.io')(httpServer,{
    cors:{
        origin: process.env.FRONTEND_URL,
        methods: ["GET","POST"]
    }
})

io.on("connection",socket=>{
    socket.on('get-document', async documentId=>{
        const document = await findOrCreateDocument(documentId)
        socket.join(documentId)
        
        socket.emit('load-document',document.data)

        socket.on('send-changes',delta=>{
            socket.broadcast.to(documentId).emit('receive-changes',delta)
        })

        socket.on("save-document",async data=>{
            await Document.findByIdAndUpdate(documentId,{data})
        })
    })
})

const defaultValue = "";
async function findOrCreateDocument(id){
    if(id==null)    return 

    const document = await Document.findById(id);
    if(document)
        return document;

    return await Document.create({_id:id,data:defaultValue})
}

const docRouter = require('../routes/DocumentRoute.js');
const { connectDB } = require('../database/db.js');

app.use('/',docRouter);

connectDB();

httpServer.listen(PORT,'0.0.0.0',()=>{
    console.log(`server is live on http://localhost:${PORT}`);
})