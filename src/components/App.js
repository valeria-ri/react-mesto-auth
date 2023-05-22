import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ProtectedRouteElement from './ProtectedRoute';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import * as auth from '../utils/auth';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [registrationError, setRegistrationError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [userData, setUserData] = useState("");
  const navigate = useNavigate();

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    setToken(jwt);
  }, [])

  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    auth
      .getUserData(token)
      .then((user) => {
        setUserData(user.data.email);
        setIsLoggedIn(true);
        navigate("/my-profile");
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
  }, [token, navigate])

  useEffect(() => {
    api.getUserInfo()
      .then(data => setCurrentUser(data))
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    api.getInitialCards()
      .then(data => setCards(data))
      .catch(err => console.log(err))
  }, [])

  function registerUser({password, email}) {
    auth
    .register(password, email)
    .then((res) => {
      localStorage.setItem("jwt", res.jwt);
      setToken(res.jwt);
    })
    .catch(err => {
      console.log(err);
      setRegistrationError("Что-то пошло не так! Попробуйте ещё раз.")
    })
  }

  function loginUser({password, email}) {
    auth.authorize(password, email)
    .then((res) => {
      localStorage.setItem("jwt", res.jwt);
      setToken(res.jwt);
    })
    .catch(err => {
      console.log(err);
      setLoginError("Неправильный логин или пароль!")
    })
  }

  function logOut() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setToken("");
    setUserData("");
    navigate("/sign-in")
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then(newCard =>
        setCards(state => state.map((c) => c._id === card._id ? newCard : c))
      )
      .catch(err => console.log(err))
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => setCards(cards.filter(c => c !== card)))
      .catch(err => console.log(err))
  }

  function handleUpdateUser(user) {
    api.editProfile(user)
      .then(data => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => console.log(err))
  }

  function handleUpdateAvatar(user) {
    api.editAvatar(user)
      .then(data => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => console.log(err))
  }

  function handleAddPlaceSubmit(card) {
    api.addCard(card)
    .then(newCard => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch(err => console.log(err))
  }

  if (isLoading) {
    return <div>Загрузка...</div>
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">

        <Header 
          // isLoggedIn={isLoggedIn}
          userData={userData}
          onLogOut={logOut}
        />

        <Routes>
          <Route
            path="*"
            element={
              isLoggedIn ? <Navigate to="/my-profile" /> : <Navigate to="/sign-in" />
            }
          />
          <Route 
            path="/sign-in" 
            element={
              <Login 
               loginUser={loginUser}
               errorMessage={loginError}
              />
            } 
          />
          <Route
            path="/sign-up"
            element={
              <Register 
                registerUser={registerUser}
                errorMessage={registrationError}
              />
            }
          />
          <Route 
            path="/my-profile"
            element={
              <ProtectedRouteElement 
                path="/my-profile"
                component={Main}
                onEditProfile = {handleEditProfileClick}
                onAddPlace = {handleAddPlaceClick}
                onEditAvatar = {handleEditAvatarClick}
                onCardClick = {handleCardClick}
                onCardLike = {handleCardLike}
                onCardDelete = {handleCardDelete}
                cards = {cards}
                loggedIn={isLoggedIn}
              />
            }
          />
        </Routes>
        {isLoggedIn && <Footer />}

        <EditProfilePopup 
          isOpen = {isEditProfilePopupOpen}
          onClose = {closeAllPopups}
          onUpdateUser = {handleUpdateUser}
        />

        <EditAvatarPopup 
          isOpen = {isEditAvatarPopupOpen}
          onClose = {closeAllPopups}
          onUpdateAvatar = {handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen = {isAddPlacePopupOpen}
          onClose = {closeAllPopups}
          onAddPlace = {handleAddPlaceSubmit}
        />
        
        <ImagePopup 
          card = {selectedCard}
          onClose = {closeAllPopups}
        />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;