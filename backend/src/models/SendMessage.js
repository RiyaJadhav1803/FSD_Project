const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  senderEmail: { type: String, required: true },
  recipientEmail: { type: String, required: true },
  summary: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const SendMessage = mongoose.model('SendMessage', messageSchema);

module.exports = SendMessage;
