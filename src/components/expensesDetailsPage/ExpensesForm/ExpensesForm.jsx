import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Card, CardBody, Col, Form, FormFeedback, FormGroup, Input, Label, Row } from "reactstrap";
import { v4 as uuidv4 } from "uuid";
import { EQUAL, PERCENT } from "../../../helper/constant";
import { addExpensesFor } from "../../../redux/actions/actions";

const ExpensesForm = ({ data, id }) => {
  const dispatch = useDispatch();
  const { participant } = data;
  const splitMode = [EQUAL, PERCENT];
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [payee, setPayee] = useState("");
  const [mode, setMode] = useState("");
  const [participants, setParticipants] = useState(participant);
  const [submitBtnStat, setSubmitBtnStat] = useState(false);
  console.log({ title, amount, mode, payee });

  const reset = () => {
    setTitle("");
    setAmount("");
    setPayee("");
    setMode("");
  }
  function expenseContructor({ title, amount, payee, mode, numberOfParticipant, participant }) {
    const obj = {};
    const exp = [];
      
    function divideNumsIntoParts(num, part){
      let values = [];
      while (num > 0 && part > 0) {
        const x = Number(Math.abs(num / part).toFixed(2));
        num = (num - x).toFixed(2);
        part--;
        values.push(x);
      }
      return values
    }
      
    function divideNumberPercentageWise(amount,percent) {
      return percent ? +percent * amount / 100 : 0;
    }
    if (mode === EQUAL) {
      const values = divideNumsIntoParts(amount, numberOfParticipant);
      participant.forEach((e, i) => {
        exp.push({ ...e, amount: values[i], percent: null });
      });
    }
    if (mode === PERCENT) {
      participants.forEach((e) => {
        exp.push({...e, amount: divideNumberPercentageWise(amount, e.percent)})
      })
    }
    obj["expense_id"] = uuidv4();
    obj["expense_title"] = title;
    obj["expense_amount"] = amount;
    obj["expense_payed_by"] = numberOfParticipant === 1 ? participant[0].name : payee;
    obj["expense_split_mode"] = numberOfParticipant === 1 ?  EQUAL : mode;
    obj["expenses_for"] = exp;
    return obj;
  }
  const submitHandler = (e) => {
    e.preventDefault();
    const d = expenseContructor({
      title,
      amount,
      payee,
      mode: data.participant.length === 1 ? EQUAL : mode,
      numberOfParticipant: data.participant.length,
      participant: data.participant
    });
    dispatch(addExpensesFor({
      id,
      data: d
    }));
    reset();
  }
  const percentHandler = ({id,percent}) => {
    let p = participants.map(e => e.id === id ? {...e,percent}: e)
    setParticipants(p);
  }
    
  useEffect(() => { 
    let shouldMatchHundredPercent = false;
    if (mode === PERCENT) {
      let p = participants?.map(e => e?.percent * 1)
        .filter(e => e)
      shouldMatchHundredPercent = p?.length ? !!(
        p.reduce((a, b) => Number(a) + Number(b)) === 100
      ) : false
    }
    if (mode === EQUAL) {
      shouldMatchHundredPercent = true;
    }
    const disableSubmitBtn = participants.length > 1 ? !(!!title && !!amount && !!payee && !!mode && shouldMatchHundredPercent) : !(!!title && !!amount); 
    setSubmitBtnStat(disableSubmitBtn)
  }, [
    participants, amount, payee, title, mode
  ])
  return (
    <>
      <h4 className="py-3">Add Expenses</h4>
      <Card>
        <CardBody>
          <Form method="post" onSubmit={e => submitHandler(e)}>
            <FormGroup>
              <Label>Expense Title</Label>
              <Input value={ title } placeholder="name the expense" onChange={e => setTitle(e.target.value)}></Input>
            </FormGroup>
            <FormGroup>
              <Label>Total Amount</Label>
              <Input placeholder="add amount" value={ amount}  onChange={e => setAmount(e.target.value)}></Input>
            </FormGroup>
            {
              participants?.length > 1 ?
                <Row>
                  <Col>
                    <FormGroup>
                      <Label>Paid By</Label>
                      {
                        participants.map((p) => (
                          <FormGroup check key={p.id}>
                            <Input
                              name="paid_by"
                              type="radio"
                              value={ p.name }
                              checked={ payee === p.name }
                              required
                              onChange={ e => setPayee(e.target.value)}
                            />
                            <Label check>
                              {p.name.toUpperCase()}
                            </Label>
                          </FormGroup>
                        ))       
                      }
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label>Split Mode</Label>
                      {
                        splitMode.map((p,i) => (
                          <FormGroup check key={i}>
                            <Input
                              name="mode"
                              type="radio"
                              value={p}
                              checked={ mode === p}
                              required
                              onChange={ e => setMode(e.target.value)}
                            />
                            <Label check>
                              {p.toUpperCase()}
                            </Label>
                          </FormGroup>
                        ))       
                      }
                    </FormGroup>
                  </Col>
                </Row>
                : null
            }

            {
              mode.toUpperCase() === PERCENT ?
                <div>
                  <p>*Please sum to 100%</p>     
                  <Row>
                    {
                      participant.map(p => (
                        <Col md={6} sm={12} key={ p.id}>
                          <FormGroup>
                            <Label>{ p.name.toUpperCase()}</Label>
                            <Input placeholder="Please enter percentage" type="number" min={0} max={100} onChange={ e => percentHandler({id: p.id, percent: e.target.value})}></Input>
                            <FormFeedback tooltip>
                                Oh noes! that name is already taken
                            </FormFeedback>
                          </FormGroup>
                        </Col>
                      ))
                    }
                  </Row>
                </div>
                : null
            }
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button value="Submit" disabled={submitBtnStat} className="mt-3" style={{
                width: "100px"
              }}>
                Submit
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </>
  )
}

export default ExpensesForm