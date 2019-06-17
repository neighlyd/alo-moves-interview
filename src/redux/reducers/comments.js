import { ADD_COMMENT, DELETE_COMMENT, EDIT_COMMENT, SET_COMMENTS } from '../actions/comments';

// Comments will be an array of objects. As such:
// let comments = [{id: 1, text: 'comment 1'}, {id: 2, text: 'comment 2'}]

const commentsReducerDefaultState = [];

export default (state = commentsReducerDefaultState, action) => {
  switch(action.type){
    case ADD_COMMENT:
      return [
        ...state,
        action.comment
      ];
    case DELETE_COMMENT:
      return state.filter( comment => comment.id !== action.id);
    case EDIT_COMMENT:
      return state.map(comment => {
        if (comment.id === action.id){
          return {
            ...comment,
            ...action.updates
          }
        } else {
          return comment;
        }
      });
    case SET_COMMENTS:
      return action.comments
    default:
      return state;
  };
};