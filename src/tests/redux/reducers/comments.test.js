import commentsReducer from '../../../redux/reducers/comments';
import comments from '../../fixtures/comments';
import { ADD_COMMENT, DELETE_COMMENT, EDIT_COMMENT, SET_COMMENTS } from '../../../redux/actions/comments';

it('should set up default empty comment array', () => {
  const state = commentsReducer(undefined, {type: '@@INIT'});
  expect(state).toEqual([]);
});

it('should add comment', () => {
  const action = {
    type: ADD_COMMENT,
    comment: {
      id: 3,
      text: 'New Comment', 
      updatedAt: new Date()
      }
  };

  const state = commentsReducer(comments, action);
  expect(state).toEqual([...comments, action.comment]);
});

it('should delete comment by id', () => {
  const action = {
    type: DELETE_COMMENT,
    id: comments[1].id
  }
  const state = commentsReducer(comments, action);
  expect(state).toEqual([comments[0]]);
});

it('should not delete comment with invalid id', () => {
  const action = {
    type: DELETE_COMMENT,
    id: '42'
  };
  const state = commentsReducer(comments, action);
  expect(state).toEqual(comments);
})

it('should edit comment by id', () => {
  const action = {
    type: EDIT_COMMENT,
    id: comments[1].id,
    updates: {
      text: 'New Comment Text'
    }
  };
  const state = commentsReducer(comments, action);
  expect(state[1].text).toEqual(action.updates.text);
});

it('should not edit comment with invalid id', () => {
  const action = {
    type: EDIT_COMMENT,
    id: '42',
    updates: {
      text: 'New Comment Text'
    }
  };
  const state = commentsReducer(comments, action);
  expect(state).toEqual(comments);
});

it('should set comments', () => {
  const action = {
    type: SET_COMMENTS,
    comments: [comments[0]]
  }
  const state = commentsReducer(comments, action);
  expect(state).toEqual([comments[0]]);
})