import React from 'react';
import './Welcome.css';
import parolaIllustration from '../../assets/imgs/parola_illustration.svg';

const welcome = () => {
  return (
    <div className='body'>
      <img
        src={parolaIllustration}
        alt='Illustration of the Parola chatbot'
        className='image'
      />
      <h1 className='h1'>Parola</h1>
      <a href='/chat' className='button w-button'>
        Chat with me
      </a>
      <p className='p--small--50-opacity'>
        * By pressing this button you will accept our terms and conditions.
      </p>
    </div>
  );
};

export default welcome;
