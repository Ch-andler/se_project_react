const baseUrl = "http://localhost:3001";
const headers = { "Content-Type": "application/json" };

function checkResponse(res) {
  if (res.ok) {
    return res.json(); // Parse and return JSON if the response is ok.
  }
  return res.json().then((error) => Promise.reject(error)); // Parse error details and reject.
}

export const getItems = () => {
  return fetch(`${baseUrl}/items`).then(checkResponse);
};

export const updateUserProfile = (userData, token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  }).then(handleRequest);
};

export const addItem = async (item, token) => {
  const response = await fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  });

  return checkResponse(response);
};

export const deleteItem = async (id, token) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};
