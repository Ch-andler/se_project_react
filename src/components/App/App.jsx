import { useState, useEffect } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import {
  getWeather,
  filterWeatherData,
  deleteItem,
  getItems,
} from "../../utils/weatherApi.js";
import { coordinates, APIkey } from "../../utils/constants";
import Footer from "../Footer/Footer.jsx";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { Routes, Route } from "react-router-dom";

import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import ConfirmationModal from "../../ConfirmationModal/ConfirmationModal.jsx"; // Import Confirmation Modal

{
  /* <BrowserRouter basename="/se_project_react">
  <App />
</BrowserRouter>; */
}

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [items, setItems] = useState([]);

  const handleAddItem = async (newItem) => {
    try {
      const addedItem = await addItem(newItem); // Send the item to the API
      setItems((prevItems) => [...prevItems, addedItem]); // Update state with the API response
      setIsAddModalOpen(false); // Close modal after success
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Failed to add item. Please try again."); // Show an error message
    }
  };

  const handleOpenModal = () => setIsAddModalOpen(true);
  const handleCloseModal = () => setIsAddModalOpen(false);

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isModalActive, setIsModalActive] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleCardClick = (card) => {
    if (!card._id) {
      console.error("Selected card is missing _id", card);
      return;
    }
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  const handleAddItemSubmit = async (item) => {
    try {
      const newItem = await addItem(item);
      setClothingItems([newItem, ...clothingItems]);
    } catch (error) {
      console.error("Failed to add item:", error);
    }
  };

  const generateUniqueId = () => {
    return `item-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  };

  const handleCardDelete = async (card) => {
    if (!card._id) {
      console.error("Card is missing _id", card);
      return;
    }

    try {
      await deleteItem(card._id);
      setClothingItems((prevItems) =>
        prevItems.filter((item) => item._id !== card._id)
      );
      closeActiveModal();
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "F" ? "C" : "F"));
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);

    const fetchItems = async () => {
      try {
        const items = await getItems();
        setClothingItems(items);
      } catch (error) {
        console.error(error);
      }
    };

    fetchItems();
  }, []);

  const handleShowConfirmationModal = (item) => {
    setItemToDelete(item); // Set the item to delete
    setIsModalActive(true); // Show the modal
  };

  const handleCancelDelete = () => {
    setIsModalActive(false); // Hide the modal if canceled
    setItemToDelete(null);
  };

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />

          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  handleCardDelete={handleCardDelete}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  handleCardClick={handleCardClick}
                  handleCardDelete={handleCardDelete}
                  onAddNewClick={() => setActiveModal("add-garment")}
                />
              }
            />
          </Routes>
        </div>
        <ItemModal
          handleCardDelete={handleCardDelete}
          activeModal={activeModal}
          card={selectedCard}
          onClose={closeActiveModal}
          onDelete={() => handleShowConfirmationModal(item)}
        />

        <AddItemModal
          onClose={closeActiveModal}
          isOpen={activeModal === "add-garment"}
          onSubmit={handleAddItem}
        />
        <ConfirmationModal
          active={isModalActive}
          itemName={itemToDelete?.name}
          onConfirm={() => handleDelete(itemToDelete._id)}
          onCancel={handleCancelDelete}
        />

        <Footer />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
