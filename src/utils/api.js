const baseUrl = "http://localhost:3001";

export const getItems = () => {
  return fetch("http://localhost:3001/items").then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  });
};

export const addItem = async (item) => {
  const response = await fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return response.json();
};

export const deleteItem = (id) => {
  if (!id) {
    return Promise.reject("Item ID is required");
  }

  return fetch(`${baseUrl}/items${id}`, {
    method: "DELETE",
  }).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
  });
};
