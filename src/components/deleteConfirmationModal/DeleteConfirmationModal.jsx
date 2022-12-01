import React from "react"
import {
  Button, Modal, ModalHeader, ModalFooter
} from "reactstrap";

const DeleteConfirmationModal = ({modalState = false, modalHeaderText, deleteHandler, cancelHandler}) => {
  return (
    <Modal isOpen={modalState}>
      <ModalHeader >{modalHeaderText}</ModalHeader>
      <ModalFooter>
        <Button color="danger" onClick={() => deleteHandler()}>Delete</Button>{" "}
        <Button color="secondary" onClick={() => cancelHandler()}>Cancel</Button>
      </ModalFooter>
    </Modal>
  )
}

export default DeleteConfirmationModal