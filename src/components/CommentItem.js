import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as linkify from 'linkifyjs';
import hashtag from 'linkifyjs/plugins/hashtag';
import Linkify from 'linkifyjs/react';

import EditCommentForm from './EditCommentForm';
import DeleteComment from './DeleteComment';
import { startDeleteComment, startEditComment } from '../redux/actions/comments';
import linkifyOpts from '../linkifyOpts';


export const CommentItem = (props) => {
  
  // One of the downsides to using modals like this is that we are littering our space. 
  // That is to say, every list item will create a <div class='ReactModalPortal'></div> element at the foot of our page. 
  // These elements will only be populated upon modal open, but it still has the potential to be a LOT of <div> elements.
  const [ editModalOpen, setEditModalOpen ] = useState(null);
  
  const handleEditModalClose = () => setEditModalOpen(false);
  
  const handleEditComment = (comment) => {
    props.startEditComment(props.id, comment);
    handleEditModalClose();
  }
  
  const editComment = () => {
    setEditModalOpen(true);
  }
  
  const [ deleteModalOpen, setDeleteModalOpen ] = useState(null);
  
  const handleDeleteModalClose = () => setDeleteModalOpen(false);
  
  const handleDeleteComment = () => {
    props.startDeleteComment(props.id);
    handleDeleteModalClose();
  }
  
  const deleteComment = () => {
    setDeleteModalOpen(true);
  }
  
  hashtag(linkify);
  
  return(
    <li>
      <div className='comment'>
        <Linkify options={linkifyOpts} className='comment__text'>{props.text}</Linkify>
        <div className='comment__buttons'>
          <button onClick={editComment}>Edit</button>
          <button onClick={deleteComment}>Delete</button>
        </div>
      </div>
      <EditCommentForm
        modalOpen={editModalOpen}
        handleModalClose={handleEditModalClose}
        formTitle='Edit Comment'
        buttonLabel='Save'
        comment={props.text}
        handleSubmit={handleEditComment}/>
      <DeleteComment
        modalOpen={deleteModalOpen}
        handleModalClose={handleDeleteModalClose}
        formTitle='Delete Comment'
        handleSubmit={handleDeleteComment}/>
    </li>
  )
};

const mapDispatchToProps = (dispatch) => ({
  startEditComment: (id, comment) => dispatch(startEditComment(id, comment)),
  startDeleteComment: (id) => dispatch(startDeleteComment(id))
})

export default connect(null, mapDispatchToProps)(CommentItem);