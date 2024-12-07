import { Server } from 'socket.io';
import server from './server.js';



const io = new Server(server);


io.on('connection', (socket) => {

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    
    socket.on('message', (msg) => {
        console.log('message: ' + msg);
    });
    console.log('a user connected');
});




export default io