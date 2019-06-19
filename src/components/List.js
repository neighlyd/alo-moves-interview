import React from 'react';
import firebase from '../firebase/firebase';

import AddComment from './AddComment';
import CommentItem from './CommentItem';

export class List extends React.Component {

  constructor(props) {
    super(props);
    this.db = firebase.collection(this.props.collection);
    this.state = {
      comments: [],
      loading: true
    };
  }

  handleAddComment = (text) => {
    this.db.doc().set({
      text,
      updatedAt: new Date()
    })
  }

  dbSubscribe = () => {
    let observer = this.db.onSnapshot(querySnapshot => {
      querySnapshot.docChanges().forEach( change => {
        const updatedComment = {
          id: change.doc.id,
          text: change.doc.data().text,
          updatedAt: change.doc.data().updatedAt
        };

        if (change.type === 'added') {
          this.setState( prevState => ({
            comments: [...prevState.comments, updatedComment]
          }));
        };

        if (change.type === 'modified') {
          let prevState = this.state.comments;
          let comments = prevState.map(comment => {
            if (comment.id === updatedComment.id) {
              return updatedComment;
            } else {
              return comment;
            }
          });
          this.setState({comments});
        };

        if (change.type === 'removed') {
          let prevState = this.state.comments;
          let comments = prevState.filter(comment => {
            return comment.id !== updatedComment.id;
          });
          this.setState({comments});
        }
      });
    });
  }
  
  dbUnsubscribe = () => {
    this.db.onSnapshot(() => {});
  }
  
  componentDidMount () {
    this.dbSubscribe();    
  }

  componentWillUpdate () {
    if (this.state.loading) {
      this.setState({loading: false})
    }
  }

  componentWillUnmount () {
    this.dbUnsubscribe();
  }

  render(){
    return (
      <div>
        <h2 className='comment-header'>Comments</h2>      
        <ul>
          { this.state.loading ? (
            <li>
              <p className='no-comment'>{this.props.loadingMessage}</p>
            </li>
            ) : (
            this.state.comments.length === 0 ? (
              <li>
                <p className='no-comment'>{this.props.noList}</p>
              </li>
            ) : (
              this.state.comments.map(comment => (
                <CommentItem
                  key={comment.id}
                  db={this.db}
                  {...comment}
                  />
              ))
            )   
            )         
          }
        </ul>     
        <AddComment handleAddComment={this.handleAddComment} />   
      </div>
    ) 
  }
};

export default List;