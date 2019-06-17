import React from 'react';
import Modal from 'react-modal';

const DeleteComment = (props) => {

  return (
    <Modal
      isOpen={!!props.modalOpen}
      className="modal"
      closeTimeoutMS={200}
      contentLabel={props.formTitle}
      onRequestClose={props.handleModalClose}
    >
    <div>
      <h3>Delete This Comment?</h3>
      <button onClick={props.handleSubmit} className="delete__confirm_btn">Yes</button>
      <button onClick={props.handleModalClose} className="delete__deny_btn">No</button>
    </div>
    </Modal>
      
  )
}

export default DeleteComment;