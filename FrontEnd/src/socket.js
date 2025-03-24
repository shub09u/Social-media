import { io } from "socket.io-client";

let url = 'http://localhost:8090';
const socket = io(url, { 
    transports: ['websocket'],
    reconnection: true,        
    reconnectionAttempts: 5,      
    reconnectionDelay: 2000,      
    reconnectionDelayMax: 5000,autoConnect:false    
});
export default socket;