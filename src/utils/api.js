const baseUrl = "http://localhost:3001";
const headers = { "Content-Type": "application/json" };

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
  }).then(checkResponse);
};

export const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

export const addCardLike = (id, token) => {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

export const removeCardLike = (id, token) => {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

export const addItem = async (item, token) => {
  try {
    const response = await fetch(`${baseUrl}/items`, {
      method: "POST",
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(item),
    });

    const data = await checkResponse(response); // Ensure response is parsed
    console.log("Full API response:", data); // Debugging

    return data.data; // Extract the actual item
  } catch (error) {
    console.error("Error in addItem:", error);
    return null;
  }
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
