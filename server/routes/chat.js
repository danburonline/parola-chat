const Chat = require('../models/chat.model');
const router = require('express').Router();

router.route('/').post((req, res) => {
  const uuid = req.body.uuid;

  Chat.find({ uuid: uuid }, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

router.route('/new').post((req, res) => {
  const uuid = req.body.uuid;
  const conversations = req.body.conversations;

  newChat = new Chat({
    uuid: uuid,
    conversations: conversations,
    date: Date.now(),
  })
    .save()
    .then((chat) => {
      res.json(chat);
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/add').post((req, res) => {
  const uuid = req.body.uuid;
  const conversations = req.body.conversations;

  Chat.findOneAndUpdate(
    { uuid: uuid },
    { $push: { conversations: conversations } },
    { new: true }
  )
    .then((chat) => {
      res.json(chat);
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
