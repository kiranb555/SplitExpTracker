const data = [
  {
    "title": "Trip Udupi",
    "id": "1",
    "expensesList": [
      {
        "expense_name": "break fast",
        "expense_by": "user 1",
        "expense_amount": "1000",
        "expense_split":"PERCENT", 
        "expense_for": [
          {
            "name": "user 1",
            "id": "123",
            "share": "40",
            "amount": "400"
          },
          {
            "name": "user 2",
            "id": "124",
            "share": "60",
            "amount": "600"
          }
        ]
      },
      {
        "expense_name": "lunch",
        "expense_by": "user 2",
        "expense_amount": "500",
        "expense_split":"EQUAL", 
        "expense_for": [
          {
            "name": "user 1",
            "id": "123",
            "share": "50",
            "amount": "250"
          },
          {
            "name": "user 2",
            "id": "124",
            "share": "50",
            "amount": "250"
          }
        ]
      },
      {
        "expense_name": "dinner",
        "expense_by": "user 2",
        "expense_amount": "500",
        "expense_split":"EXACT", 
        "expense_for": [
          {
            "name": "user 1",
            "id": "123",
            "share":"",
            "amount": "300",
            "extra": "100"
          },
          {
            "name": "user 2",
            "id": "124",
            "share":"",
            "amount": "200"
          }
        ]
      }
    ],
    "participant" : [
      {
        "name": "user 1",
        "id": "123"
      },
      {
        "name": "user 2",
        "id": "124"
      }
    ]
  }
];

export default data