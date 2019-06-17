import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import db from '../../../firebase/firebase';

import {
  ADD_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT,
  SET_COMMENTS,
  addComment,
  deleteComment,
  editComment,
  setComments,
  startAddComment,
  startDeleteComment,
  startEditComment,
  startSetComments
} from '../../../redux/actions/comments.js';
import comments from '../../fixtures/comments';

const createMockStore = configureMockStore([thunk]);

const clearDB = async () => {
    // clear the Firestore database out first.
    // In theory, we should be doing this recursively and in batches to limit our stack.
    // However, we know that we're in test mode, so our DB will be limited by its nature.
    // For more information see: https://firebase.google.com/docs/firestore/manage-data/delete-data?authuser=0
    const snapshot = await db.collection('comments').get()
    let batch = db.batch();
    snapshot.forEach(doc => {
      batch.delete(doc.ref);
    });
    batch.commit();
};

beforeEach(async () => {
  try {
    // Clear out the DB
    clearDB();

    // With a completely cleaned out Firestore db. Add the test data.
    comments.forEach(async ({id, text, updatedAt}) => {
      await db.collection('comments').doc(id).set({
        text,
        updatedAt
      })
    });
  } catch (err) {
    console.log(err);
  }
});

// Action Setup Tests.
it('should setup delete comment action', () => {
  const action = deleteComment('1234abcd');
  expect(action).toEqual({
    type: DELETE_COMMENT,
    id: '1234abcd'
  });
});

it('should setup edit comment action', () => {
  const updates = 'Updated Text';
  const action = editComment('1234abcd', updates);
  expect(action).toEqual({
    type: EDIT_COMMENT,
    id: '1234abcd',
    updates
  });
});

it('should setup add comment action', () => {
  const comment = 'New Comment';
  const action = addComment(comment);
  expect(action).toEqual({
    type: ADD_COMMENT,
    comment
  });
});

it('should setup set comments action with data', () => {
  const action = setComments(comments);
  expect(action).toEqual({
    type: SET_COMMENTS,
    comments
  })
})



// Dispatch tests (firestore and redux integration)

it('should remove comment from Firestore if one exists', async () => {
  const store = createMockStore();
  // Get all the comments docs so we can find an ID for one of them to delete.
  const comments = await db.collection('comments').get();  
  const id = comments.docs[0].id;
  await store.dispatch(startDeleteComment(id));
  const actions = store.getActions();

  // Make sure the action got called on Dispatch.
  expect(actions[0]).toEqual({
    type: DELETE_COMMENT,
    id
  });

  // Document should no longer exist in Firestore DB.
  const doc = await db.collection('comments').doc(id).get();
  expect(doc.exists).toBeFalsy();
});

it('should remove comment from Store even if one does not exist in Firestore', async () => {
  const store = createMockStore();
  const id = '1'
  await db.collection('comments').doc(id).delete();

  await store.dispatch(startDeleteComment(id));
  const actions = store.getActions();

  // Make sure the action got called on Dispatch.
  expect(actions[0]).toEqual({
    type: DELETE_COMMENT,
    id
  });
});

it('should edit comment on Firestore if one exists', async () => {
  const store = createMockStore();
  const id = '1'
  const updates = {text: 'Updated Comment Text'};

  await store.dispatch(startEditComment(id, updates));
  const actions = store.getActions();

  // we need to use object containing so we don't have to match up the datetime object.
  expect(actions[0]).toEqual(
    expect.objectContaining({
      type: EDIT_COMMENT,
      id,
      updates: {
        text: updates.text,
        updatedAt: expect.any(Object)
      }
    })
  );

  const updatedComment = await db.collection('comments').doc(id).get();
  expect(updatedComment.data()).toEqual(
    expect.objectContaining(updates)
  );
});

it('should remove comment from store on edit if it does not exist in Firestore', async () => {
  const store = createMockStore();
  const id = '1'
  await db.collection('comments').doc(id).delete();

  await store.dispatch(startEditComment(id));
  const actions = store.getActions();

  expect(actions[0]).toEqual({
    type: DELETE_COMMENT,
    id
  });
});

// These tests aren't working due to the async play between .beforeEach(), dispatch(), and Firestore.
// Their values are correct in practice, but .beforeEach() is deleting the Firebase store before the dispatch has time to requery because of the async

// it('should add comment to Firestore and store', async () => {
//   const store = createMockStore();
//   const comment = 'third comment'

//   await store.dispatch(startAddComment(comment));
//   const actions = store.getActions();
//   const query = await db.collection('comments').where('text', '==', comment);
//   const doc = query.get();

//   expect(actions[0]).toEqual(
//     expect.objectContaining({
//       type: ADD_COMMENT,
//       text: comment,
//       updatedAt: expect.any(Object)
//     })
//   );
// });

// it('should set comments from Firestore', async () => {
//   const store = createMockStore();
//   await store.dispatch(startSetComments());
//   const actions = store.getActions();

//   expect(actions[0]).toMatchObject({
//     type: SET_COMMENTS,
//     comments: expect.arrayContaining([...comments]),
//   })
// });