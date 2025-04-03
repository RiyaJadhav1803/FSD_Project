const express = require('express');
const router = express.Router();
const SendMessage = require('../models/SendMessage');

// Send message
// Send summary message
router.post('/send-summary', async (req, res) => {
    const { senderEmail, recipientEmail, summary } = req.body;
  
    try {
      const newMessage = new SendMessage({ senderEmail, recipientEmail, summary });
      await newMessage.save();
      res.status(200).json({ message: 'Summary sent successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to send summary', error });
    }
  });
  

// Get messages by email
// Get messages by email
router.get('/get-messages/:email', async (req, res) => {
    try {
      const messages = await SendMessage.find({ recipientEmail: req.params.email });
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve messages', error });
    }
  });
  

module.exports = router;
