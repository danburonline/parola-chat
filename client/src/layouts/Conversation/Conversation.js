import React, { Fragment, useState, useEffect } from 'react';
import './Conversation.css';
import ChatHeader from '../../components/Chat/ChatHeader/ChatHeader';
import Chat from '../../components/Chat/Chat';
import ChatInput from '../../components/Chat/ChatInput/ChatInput';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import axios from 'axios';

const Conversation = () => {
  const UUID = 123; // TODO Create an UUID via fingerprinting
  const API_URL = 'http://localhost:5000'; // TODO Replace with final deployed API

  const [loading, updateLoading] = useState(true);
  const [chatHistory, updateChatHistory] = useState([]);

  useEffect(() => {
    axios({
      method: 'post',
      url: API_URL + '/chat',
      data: {
        uuid: UUID,
      },
    }).then((response) => {
      updateChatHistory((c) => response.data.conversations);
      updateLoading(false);
    });
  });

  const handleUserInput = (textInput) => {
    const newMessage = {
      messageText: textInput.current.value,
      author: 'USER',
      messageType: 'TXT',
      mediaSrc: '',
      mediaAlt: '',
    };

    axios({
      _id: Math.random(),
      method: 'post',
      url: API_URL + '/chat/add',
      data: {
        uuid: UUID,
        conversations: newMessage,
      },
    }).then((result) => {
      const newChatHistory = [...chatHistory, newMessage];
      updateChatHistory(newChatHistory);
    });

    textInput.current.value = '';
  };

  return (
    <Fragment>
      <ChatHeader />
      {loading ? (
        <div className='loader-wrapper'>
          <Loader type='ThreeDots' color='#f50057' height={80} width={80} />
        </div>
      ) : (
        <Chat chatHistory={chatHistory} />
      )}
      <ChatInput handleUserInput={handleUserInput} />
    </Fragment>
  );
};

export default Conversation;
