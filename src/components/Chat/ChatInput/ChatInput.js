import React from 'react';

const ChatInput = () => {
  return(
    <div className='write-message w-form'>
        <div
          id='wf-form-chat-form'
          name='wf-form-chat-form'
          data-name='chat-form'
          className='write-message__form'
        >
          <input
            type='text'
            className='form__input w-input'
            maxLength='256'
            name='name'
            data-name='Name'
            placeholder='Chat with me'
            id='name'
          />
          <input type='submit' value='Send' className='form__button w-button'/>
        </div>
      </div>
  )
}

export default ChatInput;