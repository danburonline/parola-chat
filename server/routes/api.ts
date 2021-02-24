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
    if (err) { res.send(err) }

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

    // Just return nothing if there aren't any conversations on the database
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
});

router.route('/add').post(async (req, res) => {
  const uuid = req.body.uuid;
  const encryptedUuid = encrypt(uuid, uuid);
  const conversations = req.body.conversations;
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
    case "detectSlider": // Variable name is from DialogFlow CX
      const newSliderMessage = sliderIntent()
      parolaMessages.push(newSliderMessage)
      break;
    case "detectImage": // Variable name is from DialogFlow CX
      const newImageMessage = imageIntent()
      parolaMessages.push(newImageMessage)
      break;
    case "detectVideo": // Variable name is from DialogFlow CX
      const newVideoMessage = videoIntent()
      parolaMessages.push(newVideoMessage)
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

      // Only send the newly saved messages back to the client
      res.send(decryptedChat.slice(decryptedChat.length - parolaMessages.length));
    })
    // Don't send any errors back to the client
    .catch(() => res.send([]));
});

export default router
