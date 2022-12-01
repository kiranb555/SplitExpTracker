import React from "react"
import { useState,useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { Col, Container, ListGroup, ListGroupItem, Row } from "reactstrap";
import ListExpenses from "./ListExpenses.jsx";
import ExpensesOverview from "./ExpensesOverview.jsx";
import ExpensesForm from "./ExpensesForm/ExpensesForm.jsx";

const ExpensesDetailsPage = () => {
  const { ID } = useParams();
  const history = useHistory();
  const [data, setData] = useState([]);
  const expensesList = useSelector(state => state.root.expensesList);
  
  useEffect(() => {
    setData((expensesList.filter(e => e.id === ID)[0] || []))
  }, [ID]);

  return (
    <Container>
      {
        data && Object.keys(data).length ?
          <>
            <div className="mt-4 d-flex">
              <FontAwesomeIcon icon={faArrowLeft} size="2x" onClick={() => history.push("/")} style={{cursor: "pointer"}} title="go back"/>
              <h5 className="mx-auto" style={{marginTop:"8px"}}>{data.title.toUpperCase()} - ( {data.date} )</h5>
            </div>
            <Row>
              <Col sm={12} lg={ 8 }>
                <ExpensesForm data={data} id={ID} />
                
            add charts here
              </Col>
              <Col>
                <h3 className="py-3">
                  Participants
                </h3>
                <ListGroup>
                  {
                    data.participant.map(p => <ListGroupItem key={p.id} style={{backgroundColor:"antiquewhite"}}> <FontAwesomeIcon icon={faUser}/> &nbsp; { p.name.toUpperCase()}</ListGroupItem>)
                  }
                </ListGroup>
                <ExpensesOverview expenses={data?.expenses} participant={data.participant} />
              </Col>
            </Row>
            <ListExpenses expenses={data?.expenses} />
          </>
          : null
      }
    </Container>
  )
}

export default ExpensesDetailsPage