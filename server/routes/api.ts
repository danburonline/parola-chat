import ChatModel from '../models/chat.model';
import express, { Router } from 'express';
import { encrypt, decrypt } from '../modules/encryption';
import { videoIntent, sliderIntent, imageIntent } from "../modules/intents"
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
    .then(() => {
      res.send([]);
    })
    .catch((err: any) => res.send([]));
});

router.route('/add').post(async (req, res) => {
  const uuid = req.body.uuid;
  const encryptedUuid = encrypt(uuid, uuid);
  const conversations = req.body.conversations;
  let sliceArray = 1;
  let encryptedConversations: any = [];

  let parolaReplies = await detectIntentText(conversations[0].messageText, sessionId);

  let parolaMessages = parolaReplies.dialogFlowResponse.map((singleMessage: any) => {
    return {
      messageText: singleMessage,
      author: 'PAROLA',
      messageType: 'TXT',
      mediaSrc: ''
    };
  });

  switch (parolaReplies.dialogFlowIntent) {
    case "detectSlider":
      const newSliderMessage = sliderIntent()
      parolaMessages.push(newSliderMessage)
      sliceArray += 1; // When an intent is triggered, the API should return two items (array.slice) instead of just one
      break;
    case "detectImage":
      const newImageMessage = imageIntent()
      parolaMessages.push(newImageMessage)
      sliceArray += 1;
      break;
    case "detectVideo":
      const newVideoMessage = videoIntent()
      parolaMessages.push(newVideoMessage)
      sliceArray += 1;
      break;
    default:
  }

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

      res.send(decryptedChat.slice(decryptedChat.length - sliceArray));
    })
    .catch((err: any) => res.status(400).json(`Error: ${err}`));
});

export default router
