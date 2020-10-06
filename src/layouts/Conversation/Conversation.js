import React, { Fragment, useState } from 'react';
import './Conversation.css';
import ChatHeader from '../../components/Chat/ChatHeader/ChatHeader';
import Chat from '../../components/Chat/Chat';
import ChatInput from '../../components/Chat/ChatInput/ChatInput';

const USER = 'user';
const PAROLA = 'parola';

const NORMAL_MESSAGE = 'normal';
const VIDEO_MESSAGE = 'video';
const IMAGE_MESSAGE = 'image';

const Conversation = () => {
  const [chatHistory, updateState] = useState({
    messages: [
      {
        messageId: 1,
        messageSender: PAROLA,
        messageText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspen disse varius enim in eros elementum tristique.',
        messageType: NORMAL_MESSAGE,
        mediaSrc: '',
        mediaAlt: ''
      },
      {
        messageId: 2,
        messageSender: USER,
        messageText: 'Lorem ipsum dolor?',
        messageType: NORMAL_MESSAGE,
        mediaSrc: '',
        mediaAlt: ''
      },
      {
        messageId: 3,
        messageSender: PAROLA,
        messageText: 'Mi quis viverra:',
        messageType: IMAGE_MESSAGE,
        mediaSrc: 'https://picsum.photos/1920/1080',
        mediaAlt: ''
      },
      {
        messageId: 4,
        messageSender: USER,
        messageText: 'Et justo duo dolore',
        messageType: NORMAL_MESSAGE,
        mediaSrc: '',
        mediaAlt: ''
      },
      {
        messageId: 5,
        messageSender: USER,
        messageText: 'At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet',
        messageType: NORMAL_MESSAGE,
        mediaSrc: '',
        mediaAlt: ''
      },
      {
        messageId: 6,
        messageSender: PAROLA,
        messageText: 'Mi quis viverra:',
        messageType: VIDEO_MESSAGE,
        mediaSrc: 'https://www.youtube.com/embed/LXb3EKWsInQ',
        mediaAlt: ''
      }
    ]
  });

  const handleUserInput = (textInput) => {

    if (textInput.current.value !== '') {

      let newMessage = {
        messageId: chatHistory.messages.length + 1,
        messageSender: USER,
        messageText: textInput.current.value,
        messageType: NORMAL_MESSAGE,
        mediaSrc: '',
        mediaAlt: ''
      }

      updateState({
        messages: [...chatHistory.messages, newMessage]
      })
    };

    textInput.current.value = ""
  };

  return (
    <Fragment>
      <ChatHeader />
      <Chat chatHistory={chatHistory} />
      <ChatInput handleUserInput={handleUserInput} />
    </Fragment>
  );
};

export default Conversation;
