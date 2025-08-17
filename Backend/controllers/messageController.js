const Message = require("../models/Message");

exports.sendMessage = async (req, res) => {
    try {
        const message = new Message({
            senderId: req.user.id,
            receiverId: req.body.receiverId,
            content: req.body.content
        });
        await message.save();
        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getChatHistory = async (req, res) => {
    try {
        const messages = await Message.find({
            $or: [
                { senderId: req.user.id, receiverId: req.params.userId },
                { senderId: req.params.userId, receiverId: req.user.id }
            ]
        }).sort({ timestamp: 1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
