import React from 'react';
import Iframe from 'react-iframe';

const ChatMessage = (props) => {
  return (
    <article
      className={
        props.messageSender === 'PAROLA'
          ? 'chat__bubble--bot'
          : 'chat__bubble--user'
      }
    >
      <p className='bubble__text'>{props.chatText}</p>

      {props.messageType === 'IMG' ? (
        <img
          alt={props.mediaAlt}
          src={props.mediaSrc}
          className='bubble__image'
        />
      ) : null}

      {props.messageType === 'VIDEO' ? (
        <div className='bubble__video w-video w-embed'>
          <Iframe url={props.mediaSrc} frameBorder='0' />
        </div>
      ) : null}
    </article>
  );
};

export default ChatMessage;
