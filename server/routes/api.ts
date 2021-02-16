import ChatModel from '../models/chat.model';
import express, { Router } from 'express';
import { encrypt, decrypt } from '../modules/encryption';
import detectIntentText from "../modules/dialogflow"
import { v4 as uuidv4 } from 'uuid';

const sessionId = uuidv4();
const router: Router = express.Router();

router.route('/').post((req, res) => {
  const uuid = req.body.uuid;
  const encryptedUuid = encrypt(uuid, uuid);

  ChatModel.findOne({ uuid: encryptedUuid.encryptedData }, (err: any, result: any) => {
    if (err) {
      res.send(err);
    }
    let decryptedChat: any = [];

    if (result) {
      result.conversations.forEach((conv: any) => {
        let decryptedConv;
        let decryptedMessageText: any = decrypt(conv.messageText, uuid);

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
  const encryptedUuid = encrypt(uuid, uuid);
  let encryptedConversations: any = [];

  conversations.forEach((conversation: any) => {
    let encryptionResult = encrypt(conversation.messageText, uuid);
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

  new ChatModel({
    uuid: encryptedUuid.encryptedData,
    conversations: encryptedConversations,
    date: Date.now(),
  })
    .save()
    .then((chat: any) => {
      let decryptedChat: any = [];

      chat.conversations.forEach((conv: any) => {
        let decryptedConv;
        let decryptedMessageText: any = decrypt(conv.messageText, uuid);

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
    .catch((err: any) => res.send([]));
});

router.route('/add').post(async (req, res) => {
  const uuid = req.body.uuid;
  const encryptedUuid = encrypt(uuid, uuid);

  const conversations = req.body.conversations;
  let encryptedConversations: any = [];

  let parolaReplies = await detectIntentText(conversations[0].messageText, sessionId);

  let parolaMessages = parolaReplies.map((singleMessage: any) => {
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

  parolaMessages.forEach((parolaMessage: any) => {
    conversations.push(parolaMessage);
  });

  conversations.forEach((conversation: any) => {
    let encryptionResult = encrypt(conversation.messageText, uuid);
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

  ChatModel.findOneAndUpdate(
    { uuid: encryptedUuid.encryptedData },
    { $push: { conversations: encryptedConversations } },
    { new: true }
  )
    .then((chat: any) => {
      let decryptedChat: any = [];

      chat.conversations.forEach((conv: any) => {
        let decryptedConv;
        let decryptedMessageText: any = decrypt(conv.messageText, uuid);

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
    .catch((err: any) => res.status(400).json(`Error: ${err}`));
});

export default router
