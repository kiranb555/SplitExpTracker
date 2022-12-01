/* eslint-disable import/no-unresolved */
import React from "react";
import { Container, Row, Col } from "reactstrap";
import CreateExpense from "../../components/createExpense/CreateExpense";
import ExpensesList from "../../components/expensesList/ExpensesList";
import "./Home.style.scss";

const Home = () => {
  return (
    <Container>
      <Row>
        <Col>
          <CreateExpense/>
        </Col>
      </Row>
      <Row>
        <Col><ExpensesList /></Col>
      </Row>
    </Container>
  );
};

export default Home;
