import { Server } from 'socket.io';
import server from '../server.js';
import Notifications from './notifications.js';
import database from '../database.js';

const io = new Server(server);


io.on('connection', (socket) => {

    socket.on('disconnect', async () => {
        console.log('user disconnected');
        await database.delete("sockets", {
            id: socket.id,
            
        })
    });
    
    socket.on('message', async (msg) => {

        const notifications = new Notifications(socket, msg)


        const res = await database.select("sockets", "sockets.id ,users.username,users.id", {
            "sockets.id":socket.id
        },{
            table:"users",
            col:"id",
            equal:"user_id"
        })

        

        if (!res) {
            const res = await database.insert("sockets", {
                id: socket.id,
                user_id: msg.user_id
            });
        }

    });
    
  

    

    



    
    
    
});




export default io