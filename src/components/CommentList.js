import React from 'react';
import { connect } from 'react-redux';

import CommentItem from './CommentItem';
import AddComment from './AddComment';
import commentsSort from '../redux/selectors/comments';

export const CommentList = (props) => {

  return(
    <div>
      <h2 className='comment-header'>Comments</h2>      
      <ul>
        { props.comments.length === 0 ? (
          <li>
            <p className='no-comment'>There are no comments yet. You can be the first commenter!</p>
          </li>
        ) : (
          props.comments.map(comment => (
            <CommentItem
              key={comment.id}
              {...comment}
              />
          ))
        )}
      </ul>
      <AddComment />
    </div>
  )
};

const mapStateToProps = (state) => {
  return {
    comments: commentsSort(state.comments)
  }
};

export default connect(mapStateToProps)(CommentList);