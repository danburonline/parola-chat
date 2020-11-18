import React, { useRef } from 'react';

const ChatInput = (props) => {
  const textInput = useRef();

  const handleEnter = event => {
    event.preventDefault();
    event.stopPropagation()
  }

  return(
    <form className='write-message w-form' onSubmit={handleEnter}>
        <div
          id='wf-form-chat-form'
          name='wf-form-chat-form'
          data-name='chat-form'
          className='write-message__form'
        >
          <input
            type='text'
            ref={textInput}
            className='form__input w-input'
            maxLength='256'
            name='name'
            data-name='Name'
            placeholder='Chat with me'
            id='name'
          />
          <input type='submit' value='Send' onClick={() => props.handleUserInput(textInput)} className='form__button w-button'/>
        </div>
      </form>
  )
}

export default ChatInput;