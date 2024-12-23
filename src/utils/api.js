const baseUrl = "http://localhost:3001";

function checkResponse(res) {
  if (res.ok) {
    return res.json(); // Parse and return JSON if the response is ok.
  }
  return res.json().then((error) => Promise.reject(error)); // Parse error details and reject.
}

export const getItems = () => {
  return fetch(`${baseUrl}/items`).then(checkResponse);
};

export const addItem = async (item) => {
  const response = await fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });

  return checkResponse(response);
};

export const deleteItem = async (id) => {
  if (!id) {
    return Promise.reject("Item ID is required");
  }

  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  }).then(checkResponse);
};
