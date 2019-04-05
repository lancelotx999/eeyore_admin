/* Mongoose Model - Conversation */
const mongoose = require('mongoose'), Schema = mongoose.Schema;

var messageSchema = new Schema({ senderID: String, content: String });

const ConversationSchema = mongoose.Schema({
    conversationID: String,
    users: [String],
    shoppingCardID: String,
    topic: String,
    messages: [messageSchema]
});

module.exports = mongoose.model('conversations', ConversationSchema);
