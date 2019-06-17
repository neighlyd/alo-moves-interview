import React, { useState } from 'react';
import { connect } from 'react-redux';

import { startAddComment } from '../redux/actions/comments';

export const AddComment = (props) => {
  const [ comment, setComment ] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    props.startAddComment(comment);
    setComment('')
  }

  return(
    <form onSubmit={handleSubmit} className='add-comment__form'>
      <input 
        type='text'
        placeholder='Enter Your Comment'
        className='add-comment__input text-input'
        aria-label='Add Comment'
        autoFocus
        value={comment}
        onChange={e => setComment(e.target.value)}
      />
      { comment !== '' ? (
        <button
          className='add-comment__btn'
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

const mapDispatchToProps = (dispatch) => ({
  startAddComment: (comment) => dispatch(startAddComment(comment))
})

export default connect(null, mapDispatchToProps)(AddComment);
