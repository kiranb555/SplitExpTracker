import React, {useEffect,useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupee, faUser, faSackDollar } from "@fortawesome/free-solid-svg-icons";
import { Card, Col, ListGroup, ListGroupItem, ListGroupItemHeading, Row } from "reactstrap";
import {
  findWhomToPayWhom,
  getIndividualExpenses, makeNumberWithCommas, totalAmountPayedBy
} from "../../helper/helper";

const ExpensesOverview = ({ expenses, participant }) => {
  const expense_amt = expenses?.map(e => e?.expense_amount * 1);
  const total = expense_amt.length ? expense_amt.reduce((a, b) => a + b) : 0;
  const [individualExp, setIndividualExp] = useState("");

  console.log({
    participant
  })
  useEffect(() => {
    setIndividualExp(getIndividualExpenses(expenses));
  }, [expenses]);

  const owns = expenses.length && participant.length && findWhomToPayWhom({ expenses, participant });
  const whoAlreadyPaidHowMuch = totalAmountPayedBy(expenses, participant);
  return (
    <>
      {
        expenses.length ? 
          <>
            <h4 className="py-3"> Overview </h4>
            <Card className="p-4" style={{backgroundColor:"aliceblue"}}>
              <ListGroup>
                <ListGroupItemHeading>
                    Individual Expenses
                </ListGroupItemHeading>
                {
                  Object.keys(individualExp).map((name, i) =>
                    <ListGroupItem key={`${name}_${i}`} style={{backgroundColor:"antiquewhite"}}>
                      <Row>
                        <Col>
                          <FontAwesomeIcon icon={faUser} /> &nbsp; {name.toUpperCase()}
                        </Col>
                        <Col>
                          <FontAwesomeIcon icon={faIndianRupee} /> &nbsp;<b>{makeNumberWithCommas(individualExp[name])}</b>
                        </Col>
                      </Row>
                    </ListGroupItem>)
                }
                <ListGroupItem style={{backgroundColor:"antiquewhite"}}>
                  <Row>
                    <Col>
                      <FontAwesomeIcon icon={faSackDollar} /> &nbsp;Total Expenses
                    </Col>
                    <Col>
                      <FontAwesomeIcon icon={faIndianRupee} /> &nbsp;
                      <b>{makeNumberWithCommas(total)}</b>
                    </Col>
                  </Row>
                </ListGroupItem>
              </ListGroup>
              <ListGroup className="mt-3" style={{borderTop:"none"}}>
                <ListGroupItemHeading>Individual Paid</ListGroupItemHeading>
                {
                  Object.keys(whoAlreadyPaidHowMuch).length ? Object.keys(whoAlreadyPaidHowMuch).map(e =>
                    <ListGroupItem key={ e } style={{backgroundColor:"antiquewhite"}}>
                      <Row>
                        <Col>
                          <FontAwesomeIcon icon={faUser} /> &nbsp; {e.toUpperCase()}
                        </Col>
                        <Col>
                          <FontAwesomeIcon icon={faIndianRupee} /> &nbsp;<b>{makeNumberWithCommas(whoAlreadyPaidHowMuch[e])}</b>
                        </Col>
                      </Row>
                    </ListGroupItem>) : null
                }
              </ListGroup>
              {
                owns?.length ? 
                  <ListGroup className="mt-3"  style={{borderTop:"none"}}>
                    <ListGroupItemHeading>
                    Payback Details
                    </ListGroupItemHeading>
                    {
                      owns.map((e, i) => (
                        <ListGroupItem key={i} style={{backgroundColor:"antiquewhite"}}>
                          <div dangerouslySetInnerHTML={{ __html: e }} className="d-flex justify-content-between"/>
                        </ListGroupItem>
                      ))
                    }
                  </ListGroup>
                  : null
              }
            </Card>
          </>
          : null
      }
    </>
  )
}

export default ExpensesOverview