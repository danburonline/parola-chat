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
  const [messages, setMessages] = useState([
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
        messageSender: PAROLA,
        messageText: 'Duis cursus, mi quis viverra ornare!',
        messageType: NORMAL_MESSAGE,
        mediaSrc: '',
        mediaAlt: ''
      },
      {
        messageId: 3,
        messageSender: USER,
        messageText: 'Lorem ipsum dolor?',
        messageType: NORMAL_MESSAGE,
        mediaSrc: '',
        mediaAlt: ''
      },
      {
        messageId: 4,
        messageSender: USER,
        messageText:
          'Adipiscing elit. Suspen disse varius enim in eros elementum tristique…',
        messageType: NORMAL_MESSAGE,
        mediaSrc: '',
        mediaAlt: ''
      },
      {
        messageId: 5,
        messageSender: PAROLA,
        messageText: 'Mi quis viverra:',
        messageType: IMAGE_MESSAGE,
        mediaSrc: 'http://localhost:3000/static/media/image-001.f4b79572.jpg',
        mediaAlt: ''
      },
      {
        messageId: 6,
        messageSender: USER,
        messageText: 'Et justo duo dolore',
        messageType: NORMAL_MESSAGE,
        mediaSrc: '',
        mediaAlt: ''
      },
      {
        messageId: 7,
        messageSender: USER,
        messageText: 'At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet',
        messageType: NORMAL_MESSAGE,
        mediaSrc: '',
        mediaAlt: ''
      },
      {
        messageId: 8,
        messageSender: PAROLA,
        messageText: 'Mi quis viverra:',
        messageType: VIDEO_MESSAGE,
        mediaSrc: 'https://cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.youtube.com%2Fembed%2FLXb3EKWsInQ%3Ffeature%3Doembed&display_name=YouTube&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DLXb3EKWsInQ&image=https%3A%2F%2Fi.ytimg.com%2Fvi%2FLXb3EKWsInQ%2Fhqdefault.jpg&key=c4e54deccf4d4ec997a64902e9a30300&type=text%2Fhtml&schema=youtube',
        mediaAlt: ''
      }
    ]
  );

  return (
    <Fragment>
      <ChatHeader />
      <Chat messages={messages}/>
      <ChatInput />
    </Fragment>
  );
};

export default Conversation;
