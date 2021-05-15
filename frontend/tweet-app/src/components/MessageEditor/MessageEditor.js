import React, { useState } from 'react';
import './MessageEditor.css';

const MessageEditor = ({
  handleOnSubmit,
  message,
  setMessage,
  buttonMessage,
  placeholder,
}) => {
  const [error, setError] = useState('');

  const handleOnChange = (e) => {
    if (e.target.value.length <= 144) {
      setMessage(e.target.value);
      setError('');
    } else {
      setMessage(e.target.value.substring(0, 144));
      setError('Max 144 characters');
    }
  };
  return (
    <div className='mt-3 pb-3 message-editor__container'>
      <div className='message-editor__input'>
        <textarea
          placeholder={placeholder}
          className='form-control message-editor__text-area'
          name=''
          id='message-message'
          rows='4'
          onChange={handleOnChange}
          value={message}
        ></textarea>
        <div className='w-100 text-end mt-3'>
          <span className='me-4 text-danger'>{error}</span>
          <button
            className='btn btn-primary message-editir__post-button'
            onClick={handleOnSubmit}
          >
            {buttonMessage}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageEditor;
