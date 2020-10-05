import React from 'react';

import parolaIllustration from '../../../assets/imgs/parola_illustration.svg';
import closeIcon from '../../../assets/imgs/close.svg';

const ChatHeader = () => {
  return (
    <header className='chat-header'>
      <div className='header__info-container'>
        <img
          src={parolaIllustration}
          alt='Illustration of the Parola robot'
          className='info-container__picture'
        />
        <p className='info-container__text'>Parola</p>
      </div>
      <a href='/' className='anchor w-inline-block'>
        <img
          src={closeIcon}
          alt='Close Icon'
          className='header__close--50-opacity'
        />
      </a>
    </header>
  );
};

export default ChatHeader;
