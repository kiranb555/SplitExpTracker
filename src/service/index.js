const url = "";

const myFetch = {
  getData: async () => {
    let get = await fetch(url);
    let res = await get.json();

    return res.data;
  },

  postData: async ({ body }) => {
    fetch(`${url}`, {
      method: "POST",
      body: JSON.stringify({
        ...body,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  },
};

export default myFetch;
