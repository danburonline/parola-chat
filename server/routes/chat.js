const Chat = require('../models/chat.model');
const router = require('express').Router();
const encryption = require('../modules/encryption');
const dialogflow = require('../modules/dialogflow');
const uuid = require('uuid');
const sessionId = uuid.v4();

router.route('/').post((req, res) => {
  const uuid = req.body.uuid;
  const encryptedUuid = encryption.encrypt(uuid, uuid);

  Chat.findOne({ uuid: encryptedUuid.encryptedData }, (err, result) => {
    if (err) {
      res.send(error);
    }
    let decryptedChat = [];

    if (result) {
      result.conversations.forEach((conv) => {
        let decryptedConv;
        decryptedMessageText = encryption.decrypt(conv.messageText, uuid);

        decryptedConv = {
          _id: conv._id,
          messageText: decryptedMessageText,
          author: conv.author,
          mediaSrc: conv.mediaSrc,
          messageType: conv.messageType,
        };

        decryptedChat.push(decryptedConv);
      });

      res.send(decryptedChat);
      return;
    }

    res.send([]);
    return;
  });
});

router.route('/new').post((req, res) => {
  const uuid = req.body.uuid;
  const conversations = req.body.conversations;
  const encryptedUuid = encryption.encrypt(uuid, uuid);
  let encryptedConversations = [];

  conversations.forEach((conversation) => {
    let encryptionResult = encryption.encrypt(conversation.messageText, uuid);
    let encryptedText = encryptionResult.encryptedData;
    let iv = encryptionResult.iv;

    let newEncryptedMessage = {
      messageText: {
        encryptedData: encryptedText,
        iv: iv,
      },
      author: conversation.author,
      messageType: conversation.messageType,
      mediaSrc: conversation.mediaSrc,
    };

    encryptedConversations.push(newEncryptedMessage);
  });

  new Chat({
    uuid: encryptedUuid.encryptedData,
    conversations: encryptedConversations,
    date: Date.now(),
  })
    .save()
    .then((chat) => {
      let decryptedChat = [];

      chat.conversations.forEach((conv) => {
        let decryptedConv;
        decryptedMessageText = encryption.decrypt(conv.messageText, uuid);

        decryptedConv = {
          _id: conv._id,
          messageText: decryptedMessageText,
          author: conv.author,
          mediaSrc: conv.mediaSrc,
          messageType: conv.messageType,
        };
        decryptedChat.push(decryptedConv);
      });
      res.send(decryptedChat);
    })
    .catch((err) => res.send([]));
});

router.route('/add').post(async (req, res) => {
  const uuid = req.body.uuid;
  const encryptedUuid = encryption.encrypt(uuid, uuid);

  const conversations = req.body.conversations;
  let encryptedConversations = [];

  let parolaReplies = await dialogflow(conversations[0].messageText, sessionId);

  let parolaMessages = parolaReplies.map((singleMessage) => {
    return {
      messageText: singleMessage,
      author: 'PAROLA',
      messageType: 'TXT',
      mediaSrc: '',
      mediaAlt: '',
    };
  });

  // TODO Fulfillment replies/promises would be communicated here
  // ! They would push the reply message to the conversations array
  // Example
  // let testFulfillmentReply = {
  //   messageText: "This is a test reply",
  //   author: 'PAROLA',
  //   messageType: 'VIDEO',
  //   mediaSrc: 'https://www.youtube.com/embed/Kn0EA1OXN24',
  //   mediaAlt: ''
  // };
  // conversations.push(testFulfillmentReply);

  parolaMessages.forEach((parolaMessage) => {
    conversations.push(parolaMessage);
  });

  conversations.forEach((conversation) => {
    let encryptionResult = encryption.encrypt(conversation.messageText, uuid);
    let encryptedText = encryptionResult.encryptedData;
    let iv = encryptionResult.iv;

    let newEncryptedMessage = {
      messageText: {
        encryptedData: encryptedText,
        iv: iv,
      },
      author: conversation.author,
      messageType: conversation.messageType,
      mediaSrc: conversation.mediaSrc,
    };
    encryptedConversations.push(newEncryptedMessage);
  });

  Chat.findOneAndUpdate(
    { uuid: encryptedUuid.encryptedData },
    { $push: { conversations: encryptedConversations } },
    { new: true }
  )
    .then((chat) => {
      let decryptedChat = [];

      chat.conversations.forEach((conv) => {
        let decryptedConv;
        decryptedMessageText = encryption.decrypt(conv.messageText, uuid);

        decryptedConv = {
          _id: conv._id,
          messageText: decryptedMessageText,
          author: conv.author,
          mediaSrc: conv.mediaSrc,
          messageType: conv.messageType,
        };

        decryptedChat.push(decryptedConv);
      });
      res.send(decryptedChat);
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
