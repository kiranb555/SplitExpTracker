import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Col, Form, FormGroup, Input, Label, Button, Row, ListGroup, ListGroupItem, Card
} from "reactstrap";
import { v4 as uuidv4 } from "uuid";
import { addExpensesList } from "../../redux/actions/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import DeleteConfirmationModal from "../deleteConfirmationModal/DeleteConfirmationModal.jsx";

const CreateExpense = () => {
  const dispatch = useDispatch();
    
  const [expenseTitle, setExpenseTitle] = useState("");
  const [date, setDate] = useState("");
  const [members, setMembers] = useState([]);
  const [participant, setParticipant] = useState("");
  const [modalState, setModalState] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState("");
    
  const resetValues = () => {
    setExpenseTitle("");
    setDate("");
    setMembers([]);
  }
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addExpensesList({
      title: expenseTitle,
      id: uuidv4(),
      date,
      participant: members?.length ? members : [{name: "user 1", id: uuidv4() }],
      expenses: []
    }));
    resetValues();
  }
  useEffect(() => { 
    if (deleteUserId && modalConfirm ) {
      setMembers(members.filter(e => e.id !== deleteUserId));
      setModalConfirm(false);
    }
  }, [deleteUserId, modalConfirm])
  const disableSubmitBtn = !(!!members.length && !!expenseTitle);
  return (
    <div>
      <h3 className="py-3">Add Expenses</h3>
      <Card className="px-4 py-4" style={{backgroundColor:"aliceblue"}}>
        <Form
          method="post"
          onSubmit={(e) => submitHandler(e)}
        >
          <FormGroup>
            <Label for="expenseName">Expense Title</Label>
            <Input required id='expenseName' value={ expenseTitle} onChange={(e) => setExpenseTitle(e.target.value) } />
          </FormGroup>
          <FormGroup>
            <Label for="expenseDate">Date</Label>
            <Input type="date" name="date" id="expenseDate" placeholder="date placeholder" value={ date } onChange={(e) => setDate(e.target.value)}/>
          </FormGroup>
          <Row>
            <Col xs='6'>
              <FormGroup>
                <Label for="members">Add Participants</Label>
                <Input id='members' value={participant} onChange={ (e) => setParticipant(e.target.value) } />
              </FormGroup>
            </Col>
            <Col xs='6'  style={{alignItems:"center", display:"flex", marginTop:"15px"}}>
              <Button
                onClick={() => {
                  setMembers([...members, { name: participant, id: uuidv4() }]);
                  setParticipant("");
                }
                }>Add</Button>
            </Col>
          </Row>
          {
            members?.length ?
              <ListGroup>
                {
                  members.map(({name,id}) => {
                    return (
                      <ListGroupItem key={id}>{name}
                        <Button size="sm" outline onClick={() => {
                          setModalState(!modalState);
                          setDeleteUserId(id);
                        }
                        } style={{ float: "right" }}><FontAwesomeIcon icon={faClose} /></Button>
                      </ListGroupItem>
                    );
                  })
                }
              </ListGroup> : null
          }
          <Button className="mt-4 mb-2" value="Submit" disabled={ disableSubmitBtn}>Submit</Button>
        </Form>
        <DeleteConfirmationModal
          modalState={modalState}
          modalHeaderText={`Are you sure, want to delete ${(members?.filter(e => e.id === deleteUserId)[0] || []).name} ?`}
          deleteHandler={
            () => {
              setModalConfirm(true);
              setModalState(false);
            }
          }
          cancelHandler={
            () => {
              setModalConfirm(false);
              setModalState(false);
            }
          } />
      </Card>
    </div>
  )
}

export default CreateExpense