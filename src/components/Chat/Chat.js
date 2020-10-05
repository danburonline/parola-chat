import React from 'react';
import ChatMessage from '../Chat/ChatMessage/ChatMessage';

const Chat = (props) => {
  let messages = props.messages.map((el) => {
    return (
      <ChatMessage
        key={el.messageId}
        messageSender={el.messageSender}
        chatText={el.messageText}
        messageType={el.messageType}
        mediaSrc={el.mediaSrc}
        mediaAlt={el.mediaAlt}
      />
    );
  });

  return <main className='chat'>{messages}</main>;
};

export default Chat;
