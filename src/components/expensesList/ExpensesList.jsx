import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Card, CardBody,
  CardTitle, CardSubtitle, Button, Row, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import DeleteConfirmationModal from "../deleteConfirmationModal/DeleteConfirmationModal.jsx";
import { deleteExpensesList } from "../../redux/actions/actions";
import "./ExpensesList.scss";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion"

const ExpensesList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const expensesList = useSelector((state) => state.root.expensesList);
  const [modalState, setModalState] = useState(false);
  const [deleteExpenseId, setDeleteExpenseId] = useState("");
  const [modalConfirmation, setModalConfirmation] = useState(false);
  
  useEffect(() => {
    if (deleteExpenseId && modalConfirmation) {
      dispatch(deleteExpensesList(deleteExpenseId));
      setModalConfirmation(false);
    }
  }, [modalConfirmation, deleteExpenseId])
  return (
    <>
      <h3 className="py-3">Expenses</h3>
      <motion.a
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.8 }}
        style={{ x: 100 }}
      />
      <Row>
        {
          expensesList?.map(({ title,id, date }) => {
            return (
              <Col key={id} sm={6} lg={4} className="mb-4">
                <Card body outline color="secondary" className="text-center">
                  <CardTitle>{title}</CardTitle>
                  <CardSubtitle>{date}</CardSubtitle>
                  <CardBody>
                   
                    <button
                      className="card-cancel-btn"
                      onClick={() => {
                        setDeleteExpenseId(id);
                        setModalState(true);
                      }
                      }
                    >
                      <FontAwesomeIcon icon={faClose} />
                    </button>
                    <Button onClick={() => history.push(`/expenses/${id}`)}>
                      View Expense
                    </Button>
                  </CardBody>
                </Card>
              </Col>
            )
          })
        }
      </Row>
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
    </>
  )
}

export default ExpensesList