import React, { useState } from 'react';

export const AddComment = (props) => {
  const [ text, setText ] = useState('')

  const addComment = e => {
    e.preventDefault();
    props.handleAddComment(text);
    setText('');
  }
  
  return(
    <form onSubmit={addComment} className='add-comment__form'>
      <input 
        type='text'
        placeholder='Enter Your Comment'
        className='add-comment__input text-input'
        aria-label='Add Comment'
        autoFocus
        value={text}
        onChange={e => setText(e.target.value)}
      />
      { text !== '' ? (
        <button
          className='add-comment__btn'
          onClick={addComment}
        >
          Add Comment
        </button> 
      ) : (
        <button 
          disabled
          className='add-comment__btn'
        >
          Add Comment
        </button>
      )}
    </form>
  )
};

export default AddComment;
