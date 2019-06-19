import React, { useState } from 'react';
import Modal from 'react-modal'

const CommentForm = (props) => {

  const [ text, setText ] = useState(props.comment);

  const origComment = props.comment;

  const handleSubmit = e => {
    e.preventDefault();
    if (text !== '' && text !== origComment) {
      props.handleSubmit(text);
    }
  };

  return (
    <Modal
      isOpen={!!props.modalOpen}
      className='modal'
      closeTimeoutMS={200}
      contentLabel={props.formTitle}
      onRequestClose={props.handleModalClose}
    >
      <div>
        <h3>{props.formTitle}</h3>
        <form onSubmit={handleSubmit} className='edit-comment'>
          <label
            className='edit-comment__label'
          >
            Comment
          </label>
          <input 
            type='text'
            className='edit-comment__input text-input'
            autoFocus
            value={text}
            onChange={e => setText(e.target.value)}
          />
          { (text !== '' && text !== props.comment) ? (
            <button 
              className='edit-comment__btn'
            >
              {props.buttonLabel}
            </button> 
          ) : (
            <button 
              disabled
              className='edit-comment__btn'
            >
              {props.buttonLabel}
            </button>
          )}
        </form>
      </div>
    </Modal>
  )
}

export default CommentForm;