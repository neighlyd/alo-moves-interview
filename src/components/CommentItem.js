import React, { useState } from 'react';
import * as linkify from 'linkifyjs';
import hashtag from 'linkifyjs/plugins/hashtag';
import Linkify from 'linkifyjs/react';

import EditCommentForm from './EditCommentForm';
import DeleteComment from './DeleteComment';
import linkifyOpts from '../linkifyOpts';

export const CommentItem = (props) => {
  
  // One of the downsides to using modals like this is that we are littering our space. 
  // That is to say, every list item will create a <div class='ReactModalPortal'></div> element at the foot of our page. 
  // These elements will only be populated upon modal open, but it still has the potential to be a LOT of <div> elements.
  const [ editModalOpen, setEditModalOpen ] = useState(null);
  
  const handleEditModalClose = () => setEditModalOpen(false);
  
  const handleEditComment = (text) => {
    const comment = {
      text,
      updatedAt: new Date()
    };
    props.db.doc(props.id).set(comment);
    handleEditModalClose();
  }
  
  const openEditCommentModal = () => {
    setEditModalOpen(true);
  }
  
  const [ deleteModalOpen, setDeleteModalOpen ] = useState(null);
  
  const handleDeleteModalClose = () => setDeleteModalOpen(false);
  
  const handleDeleteComment = () => {
    props.db.doc(props.id).delete();
    handleDeleteModalClose();
  }
  
  const openDeleteCommentModal = () => {
    setDeleteModalOpen(true);
  }
  
  hashtag(linkify);
  
  return(
    <li>
      <div className='comment'>
        <Linkify tagName='p' options={linkifyOpts} className='comment__text'>{props.text}</Linkify>
        <div className='comment__buttons'>
          <button onClick={openEditCommentModal}>Edit</button>
          <button onClick={openDeleteCommentModal}>Delete</button>
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

export default CommentItem;