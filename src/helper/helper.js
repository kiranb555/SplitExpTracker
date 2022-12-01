export const getIndividualExpenses = (expenses) => {
  let obj = {};
  for(let i=0;i<expenses?.length;i++){
    for(let j=0;j<expenses[i]["expenses_for"]?.length;j++){
      const name = expenses[i]["expenses_for"][j]["name"];
      obj[name] = (expenses[i]["expenses_for"][j]["amount"] * 1 + (obj[name] ?? 0)).toFixed(2) * 1;
    }
  }
  return obj;
};

export const makeNumberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export function totalAmountPayedBy(expenses,participant){
  let obj = {};
  if (participant.length && expenses.length) {
    for (let i = 0; i < participant.length; i++) {
      let name = participant[i].name;
      obj[name] = expenses.map(e => e.expense_payed_by === name ? e.expense_amount * 1 : 0).reduce((a, b) => a + b);
    }
  }
  return obj
}

export function showWhoToPay(individualExpense, totalAmountPayed, participant){
  let obj = {};
  if (participant.length === 0) return obj;
  for(let i=0; i<participant.length; i++){
    let name = participant[i].name;
    obj[name] = totalAmountPayed[name] * 1 - individualExpense[name] * 1;
  }
  return obj;
}

export function splitPayments(payments) {
  // should be {
//   kiran: -7462, "my love": 7462
// };
  const people = Object.keys(payments);
  const valuesPaid = Object.values(payments);

  const sum = valuesPaid.reduce((acc, curr) => curr + acc);
  const mean = sum / people.length;

  const sortedPeople = people.sort((personA, personB) => payments[personA] - payments[personB]);
  const sortedValuesPaid = sortedPeople.map((person) => payments[person] - mean);

  let i = 0;
  let j = sortedPeople.length - 1;
  let debt;

  let res = [];
  while (i < j) {
    debt = Math.min(-(sortedValuesPaid[i]), sortedValuesPaid[j]);
    sortedValuesPaid[i] += debt;
    sortedValuesPaid[j] -= debt;

    res.push(`<div><b>${sortedPeople[i].toUpperCase()}</b> owes <b>${sortedPeople[j].toUpperCase()} </div> <div>&#8377; ${makeNumberWithCommas(debt.toFixed(2))}</b></div>`);

    if (sortedValuesPaid[i] === 0) {
      i++;
    }

    if (sortedValuesPaid[j] === 0) {
      j--;
    }
  }
  return res;
}

export function findWhomToPayWhom({expenses, participant}) {
  return splitPayments(showWhoToPay(getIndividualExpenses(expenses), totalAmountPayedBy(expenses, participant), participant))
}