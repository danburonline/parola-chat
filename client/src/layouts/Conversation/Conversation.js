import React, { Fragment, useState, useEffect } from 'react';
import './Conversation.css';
import ChatHeader from '../../components/Chat/ChatHeader/ChatHeader';
import Chat from '../../components/Chat/Chat';
import ChatInput from '../../components/Chat/ChatInput/ChatInput';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import axios from 'axios';

const Conversation = (props) => {
  const UUID = props.uuid;
  const API_URL = 'http://localhost:5000';

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
      if (response.data.length <= 0) {
        const standardMessages = [
          {
            messageText: 'Hallo 😁',
            author: 'PAROLA',
            messageType: 'TXT',
            mediaSrc: '',
            mediaAlt: '',
          },
          {
            messageText: 'Was kann ich für dich tun?',
            author: 'PAROLA',
            messageType: 'TXT',
            mediaSrc: '',
            mediaAlt: '',
          },
        ];

        axios({
          method: 'post',
          url: API_URL + '/chat/new',
          data: {
            uuid: UUID,
            conversations: standardMessages,
          },
        }).then((response) => {
          updateChatHistory((c) => response.data);
          updateLoading(false);
        });
      } else {
        updateChatHistory(response.data);
        updateLoading(false);
      }
    });
  }, [UUID]);

  const handleUserInput = (textInput) => {
    // Prevent sending empty messages
    let text = textInput.current.value.replace(/\s/g, '');

    if (text.length > 0) {
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
          conversations: [newMessage],
        },
      }).then((result) => {
        updateChatHistory(result.data);
      });
    }
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
