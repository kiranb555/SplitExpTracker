import React, { useState } from "react"
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Col, ListGroup, ListGroupItem, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupee, faClose } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { deleteExpensesFor } from "../../redux/actions/actions";
import { useParams } from "react-router-dom";
import DeleteConfirmationModal from "../deleteConfirmationModal/DeleteConfirmationModal.jsx";
import { useEffect } from "react";
import { makeNumberWithCommas } from "../../helper/helper";

const ListExpenses = ({ expenses }) => {
  const dispatch = useDispatch();
  const { ID } = useParams();
  const [open, setOpen] = useState("1");
  const [modalState, setModalState] = useState(false);
  const [modalConfirmation, setModalConfirmation] = useState(false);
  const [deleteExpenseId, setDeleteExpenseId] = useState("");
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  useEffect(() => {
    if (deleteExpenseId && modalConfirmation) {
      dispatch(deleteExpensesFor({
        id: ID,
        exp_id: deleteExpenseId
      }));
      setModalConfirmation(false);
    }
  }, [modalConfirmation, deleteExpenseId])
  return (
    <>
      {
        expenses.length ? 
          <div className="pt-4">
            <h3>Expenses</h3>
            <Accordion open={open} toggle={toggle}>
              {
                expenses.map(e => (
                  <AccordionItem key={e.expense_id}>
                    <AccordionHeader targetId={ e.expense_id}>
                      {e.expense_title}
                    </AccordionHeader>
                    <AccordionBody accordionId={e.expense_id} style={{position:"relative",backgroundColor:"aliceblue"}}>
                      <Row>
                        <Col md={6} sm={ 6 }>
                    Total Amount : <b><FontAwesomeIcon icon={faIndianRupee} /> &nbsp;{ makeNumberWithCommas(e.expense_amount)}</b>
                        </Col>
                        <Col md={5} sm={ 5 }>
                    Paid By : <b>{e.expense_payed_by.toUpperCase()}</b>
                        </Col>
                        <div style={{
                          position: "absolute",
                          width: "auto",
                          top: "20px",
                          right: "12px",
                        }}>
                          <FontAwesomeIcon icon={faClose} onClick={() => {
                            setDeleteExpenseId(e.expense_id);
                            setModalState(true);
                          }} style={{ cursor: "pointer" }} title="Delete" />
                        </div>
                      </Row>
                      <h5 className="py-3">Split Details : </h5>
                      <ListGroup>
                        {
                          e.expenses_for.map(exp =>
                            <ListGroupItem key={exp.id} style={{backgroundColor:"antiquewhite"}}>
                              <div>Name : <b>{ exp.name.toUpperCase()}</b></div>
                              <div>Split Amount : <FontAwesomeIcon icon={faIndianRupee} /> &nbsp;<b>{makeNumberWithCommas(exp.amount)}</b></div>
                              <div>Split Mode : {e.expense_split_mode}</div>
                              {
                                exp?.percent ? <div>Split Percentage : <b>{ exp.percent } % </b></div> : null
                              }
                            </ListGroupItem>)
                        }
                      </ListGroup>
                    </AccordionBody>
                  </AccordionItem>
                ))
              }
            </Accordion>
            <DeleteConfirmationModal
              modalState={modalState}
              modalHeaderText={"Are you sure, want to delete expense ?"}
              deleteHandler={
                () => {
                  setModalConfirmation(true);
                  setModalState(false);
                }
              }
              cancelHandler={
                () => {
                  setModalConfirmation(false);
                  setModalState(false);
                }
              }
            />
          </div>: null
      }
    </>
  )
}

export default ListExpenses