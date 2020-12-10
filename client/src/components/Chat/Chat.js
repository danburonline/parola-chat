import React, { useEffect } from 'react';
import ChatMessage from '../Chat/ChatMessage/ChatMessage';

const Chat = (props) => {
  useEffect(() => {
    // Always scroll to the bottom of the ad
    window.scrollTo(0, document.body.scrollHeight);
  });

  let messages = props.chatHistory.map((el) => {
    return (
      <ChatMessage
        key={el._id || Math.random()} // Get the ID from the DB or just enter an ID for the current session (will be overwritten if the user refreshes the page)
        messageSender={el.author}
        chatText={el.messageText}
        messageType={el.messageType}
        mediaSrc={el.mediaSrc}
        mediaAlt={el.mediaSrc}
      />
    );
  });

  return <main className='chat'>{messages}</main>;
};

export default Chat;
