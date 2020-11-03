import React, { Fragment, useState, useEffect } from 'react';
import './Conversation.css';
import ChatHeader from '../../components/Chat/ChatHeader/ChatHeader';
import Chat from '../../components/Chat/Chat';
import ChatInput from '../../components/Chat/ChatInput/ChatInput';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import axios from 'axios';

const Conversation = () => {
  let uuid = 123; // TODO Create an UUID via fingerprinting

  const [loading, updateLoading] = useState(true);
  const [chatHistory, updateChatHistory] = useState([]);

  useEffect(() => {
    axios({
      method: 'post',
      url: 'http://localhost:5000/chat', // TODO: Replace with final deployed API
      data: {
        uuid: uuid,
      },
    }).then((response) => {
      updateChatHistory(...chatHistory, response.data.conversations);
      updateLoading(false);
    });
  }, []);

  const handleUserInput = (textInput) => {
    // TODO Request to the API
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
