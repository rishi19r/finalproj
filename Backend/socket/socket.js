const { Server } = require("socket.io");
const Message = require("../models/Message");

function setupSocket(server) {
    const io = new Server(server, {
        cors: {
            origin: "*", // yaha frontend ka URL dalna better h
            methods: ["GET", "POST"]
        }
    });

    // Active users ka map (userId -> socketId)
    let activeUsers = new Map();

    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.id}`);

        // Jab user join karega
        socket.on("join", (userId) => {
            socket.join(userId);
            activeUsers.set(userId, socket.id);

            console.log(`User ${userId} joined and is active`);
            io.emit("active_users", Array.from(activeUsers.keys())); // Sabko active users list bhej do
        });

        // Message bhejna
        socket.on("send_message", async ({ senderId, receiverId, content }) => {
            const newMessage = new Message({
                senderId,
                receiverId,
                content
            });
            await newMessage.save();

            io.to(receiverId).emit("receive_message", {
                senderId,
                content,
                timestamp: new Date()
            });
        });

        // Disconnect hone par
        socket.on("disconnect", () => {
            // Disconnect hone par user remove karo
            for (let [userId, sockId] of activeUsers.entries()) {
                if (sockId === socket.id) {
                    activeUsers.delete(userId);
                    break;
                }
            }
            console.log(`User disconnected: ${socket.id}`);
            io.emit("active_users", Array.from(activeUsers.keys())); // Updated list bhej do
        });
    });
}

module.exports = setupSocket;
