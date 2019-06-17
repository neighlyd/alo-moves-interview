import React, { useState } from 'react';
import Modal from 'react-modal'

const CommentForm = (props) => {

  const [ comment, setComment ] = useState(props.comment);

  const origComment = props.comment;

  const handleSubmit = e => {
    e.preventDefault();
    if (comment !== '' && comment !== origComment) {
      props.handleSubmit({text: comment});
    }
  };

  return (
    <Modal
      isOpen={!!props.modalOpen}
      className="modal"
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
          <textarea 
            rows='4'
            className='edit-comment__input text-input'
            autoFocus
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
          { (comment !== '' && comment !== props.comment) ? (
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