import firebase from '../../firebase/firebase';
const db = firebase.collection('comments')

// Use const variables for action names, so we have a single place to edit them in the future.
export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const SET_COMMENTS = 'SET_COMMENTS';

// These are the pure functions that will be dispatched to the Redux store itself.
export const addComment = (comment) => ({
  type: ADD_COMMENT,
  comment
});

export const deleteComment = (id) => ({
  type: DELETE_COMMENT,
  id
});

export const editComment = (id, updates) => ({
  type: EDIT_COMMENT,
  id,
  updates
});

export const setComments = (comments) => ({
  type: SET_COMMENTS,
  comments
})

export const startAddComment = (comment = '') => {
  return async dispatch => {  
    try {      
      const data = {
        text: comment,
        updatedAt: new Date()
      };
      // Firestore's .add() method returns a documentReference. We need to populate this reference with the newly created object using the .get() method.
      // Once we have a populated object, we can then dispatch it to our Redux store.
      const docRef = await db.add(data);
      const doc = await docRef.get();
      
      if (doc) {
        dispatch(addComment({
          id: doc.id,
          text: doc.data().text,
          updatedAt: doc.data().updatedAt
        }));
      }
    } catch (err){
      console.log(err);
    };
  };
};

export const startDeleteComment = id => {
  return async dispatch => {  
    try{
      
      // First try to retrieve the Document from the Firestore DB.
      // If it still exists there, delete it remotely and locally.
      // If it has already been removed from remote, then only remove from local (e.g., another user deleted the comment and the page hasn't refreshed yet)
      // The need for this check could be partially alleviated by using sockets or subscribing to the DB store itself.
      const docRef = await db.doc(id).get();
      
      if (docRef.exists) {
        await db.doc(id).delete();
      } 
      dispatch(deleteComment(id));
    } catch (err) {
      console.log(err);
    };
  };
};

export const startEditComment = (id, comment) => {
  return async dispatch => {
    try {
      // As above, we error check to see if the document has been deleted by another user.
      const docRef = await db.doc(id).get();
      if (!docRef.exists) {
        // If another user deleted the comment before our user refreshes the page and attempts to edit, then their local version should be removed as well.
        // Otherwise, our local store will be out of sync.
        dispatch(deleteComment(id));
      } else {
        const updates = {
          ...comment,
          updatedAt: new Date()
        }
        await db.doc(id).set(updates)

        // Firestore does not return a document upon set(), so we need to retrieve the updated document from the remote DB.
        // We need to do this because they auto-format timestamp fields in their own format, which is incompatible with javascript's native Date() type.
        const doc = await db.doc(id).get();
        
        if (doc.exists) {
          const updates = {
            text: doc.data().text,
            updatedAt: doc.data().updatedAt
          };
        
          dispatch(editComment(doc.id, updates));
        } 
      }
    } catch (err) {
      console.log(err);
    };
  };
};

export const startSetComments = () => {
  return async dispatch => {
    try {
      
      // Start by fetching all comments from Firestore.
      // we then need to parse the data into an array (Firestore doesn't store info in arrays - at least, it's a pain to do so)
      // Finally, we dispatch() SET_EXPENSES with the new data array.
      let comments = [];
      
      const docRef = await db.get()
      
      docRef.forEach(comment => {
        comments.push({
          id: comment.id,
          text: comment.data().text,
          updatedAt: comment.data().updatedAt
        });
      });
      
      dispatch(setComments(comments));
    
    } catch (err) {
      console.log(err);
    };
  };
};