import { useState, useEffect } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import { getItems, deleteItem } from "../../utils/api.js";
import { coordinates, APIkey } from "../../utils/constants";
import Footer from "../Footer/Footer.jsx";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoutes/ProtectedRoutes";
import Profile from "../Profile/Profile";
import { addItem, addCardLike, removeCardLike } from "../../utils/api";
import AddItemModal from "../AddItemModal/AddItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { register, login, checkToken } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const openRegisterModal = () => setActiveModal("register");
  const openLoginModal = () => setActiveModal("login");
  const navigate = useNavigate();

  const handleCardClick = (card) => {
    if (!card || !card._id) {
      console.error("Selected card is missing _id", card);
      return;
    }
    setActiveModal("preview");
    setSelectedCard(card);
    console.log(card._id);
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

  useEffect(() => {
    if (!activeModal) return; // stop the effect not to add the listener if there is no active modal

    const handleEscClose = (e) => {
      // define the function inside useEffect not to lose the reference on rerendering
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      // don't forget to add a clean up function for removing the listener
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  const handleAddItemSubmit = async (item) => {
    const token = localStorage.getItem("jwt");

    try {
      const newItem = await addItem(item, token);

      console.log("New item from API:", newItem); // Debugging

      // ✅ Fix: Ensure we are checking for valid properties
      if (!newItem || !newItem.name) {
        console.error(
          "Item creation failed - API returned invalid item:",
          newItem
        );
        return;
      }

      setClothingItems((prevItems) => [newItem, ...prevItems]);

      closeActiveModal();
    } catch (error) {
      console.error("Failed to add new item:", error);
    }
  };

  const handleDeleteItem = async (id) => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      console.error("No token found in localStorage");
      return;
    }

    try {
      // Delete the item and update state in a single function call
      await deleteItem(id, token);
      setClothingItems((prevItems) =>
        prevItems.filter((item) => item._id !== id)
      );
      closeActiveModal(); // Close modal after deletion
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    !isLiked
      ? addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((error) => console.log(error))
      : removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((error) => console.log(error));
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

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((userData) => {
          setCurrentUser(userData);
          setIsLoggedIn(true);
        })
        .catch((error) => {
          localStorage.removeItem("jwt");
          setIsLoggedIn(false);
          setCurrentUser(null);
        });
    }
  }, []);

  const handleRegister = (name, avatar, email, password) => {
    register(name, avatar, email, password)
      .then(() => handleLogin(email, password))
      .catch((error) => console.error("Registration failed: ", error));
  };

  const handleLogin = (email, password) => {
    return login(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        return checkToken(res.token);
      })
      .then((userData) => {
        setCurrentUser(userData);
        closeActiveModal();
        return Promise.resolve();
      })
      .catch((error) => {
        console.error("Failed to fetch user data: ", error);
        return Promise.reject(error);
      });
  };

  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/");
  };

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              openRegisterModal={openRegisterModal}
              openLoginModal={openLoginModal}
              isLoggedIn={isLoggedIn}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute
                    component={Profile}
                    isLoggedIn={isLoggedIn}
                    clothingItems={clothingItems}
                    handleAddClick={handleAddClick}
                    handleCardClick={handleCardClick}
                    setActiveModal={setActiveModal}
                    onCardLike={handleCardLike}
                    currentUser={currentUser}
                    setIsLoggedIn={setIsLoggedIn}
                    handleLogOut={handleLogOut}
                  />
                }
              />
            </Routes>

            <Footer />
          </div>
          <AddItemModal
            closeActiveModal={closeActiveModal}
            isOpen={activeModal === "add-garment"}
            handleAddItemSubmit={handleAddItemSubmit}
          />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            handleDeleteItem={handleDeleteItem}
          />
          <RegisterModal
            closeActiveModal={closeActiveModal}
            isOpen={activeModal === "register"}
            onRegister={handleRegister}
            setActiveModal={setActiveModal}
          />
          <LoginModal
            closeActiveModal={closeActiveModal}
            isOpen={activeModal === "login"}
            onLogin={handleLogin}
            setActiveModal={setActiveModal}
          />
          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onClose={closeActiveModal}
            onUpdateUser={setCurrentUser}
          />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
