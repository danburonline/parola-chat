const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseUniqueValidator = require('mongoose-unique-validator');

const messageSchema = new Schema({
  messageText: {
    type: String,
  },
  messageTime: Date,
  author: {
    type: String,
    required: true,
  },
  messageType: {
    type: String,
    required: true,
  },
  mediaSrc: {
    type: String,
  },
});

const chatSchema = new Schema({
  uuid: {
    type: String,
    unique: true,
    required: true,
  },
  conversations: [messageSchema]
});

const Chat = mongoose.model('Chat', chatSchema);
chatSchema.plugin(mongooseUniqueValidator);

module.exports = Chat;
