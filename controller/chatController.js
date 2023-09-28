const { Chat, validatePostChatRequest } = require("../models/Chat");

// get all chats of on conversation with particualar user
module.exports.getChat = async (req, res, next) => {
  try {
    const { userId, friendId } = req.params;
    const chats = await Chat.find({
      $or: [
        { sender: userId, receiver: friendId },
        { receiver: userId, sender: friendId },
      ],
    });

    const modifedChats = chats.map((chat) => {
      return {
        type: chat.sender.equals(userId) ? "send" : "receive",
        message: chat.content,
        timestamp: chat.createdAt,
      };
    });
    res.status(200).send(modifedChats);
  } catch (err) {
    next(err);
  }
};

// posting chats
module.exports.postChat = async (req, res, next) => {
  try {
    const { error } = validatePostChatRequest(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { sender, receiver, content, room, status } = req.body;

    const chat = new Chat({
      sender,
      receiver,
      content,
      room,
      status,
    });

    const savedChat = await chat.save();
    res.status(201).send(savedChat);
  } catch (err) {
    next(err);
  }
};

// update chat Status

module.exports.updateChatStatus = async (req, res, next) => {
  try {
    const { chatId, newChatStatus } = req.body;
    const chat = await Chat.findById(chatId);
    chat.status = newChatStatus;
    const updatedChat = await chat.save();
    res.send(updatedChat);
  } catch (err) {
    next(err);
  }
};
