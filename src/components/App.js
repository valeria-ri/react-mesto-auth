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
import successTooltip from "../images/successTooltip.svg";
import unsuccessTooltip from "../images/unsuccessTooltip.svg";
import InfoTooltip from './InfoTooltip';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [message, setMessage] = useState({
    imgPath: '',
    title: ''
  })
  const [userData, setUserData] = useState("");
  const navigate = useNavigate();

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen]  = React.useState(false);
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
      .then(() => {
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }, [token, navigate])

  useEffect(() => {
    api.getUserInfo()
      .then(data => setCurrentUser(data))
      .catch(console.error)
  }, [])

  useEffect(() => {
    api.getInitialCards()
      .then(data => setCards(data))
      .catch(console.error)
  }, [])

  function registerUser({password, email}) {
    auth
    .register(password, email)
    .then((res) => {
      setUserData(res.data.email);
      setMessage({
        imgPath: successTooltip,
        title: "Вы успешно зарегистрировались!",
      })
      navigate("/sign-in");
    })
    .catch((err) => {
      console.log(err);
      setMessage({
        imgPath: unsuccessTooltip,
        title: "Что-то пошло не так! Попробуйте ещё раз.",
      })
    })
    .finally(() => setIsInfoTooltipOpen(true))
  }

  function loginUser({password, email}) {
    auth.authorize(password, email)
    .then((res) => {
      setIsLoggedIn(true);
      localStorage.setItem("jwt", res.token);
      navigate("/");
    })
    .catch(err => {
      console.log(err);
      setMessage({
        imgPath: unsuccessTooltip,
        title: "Что-то пошло не так! Попробуйте ещё раз.",
      })
      setIsInfoTooltipOpen(true)
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
    setIsInfoTooltipOpen(false);
  }

  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard

  useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if(isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen]) 

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then(newCard =>
        setCards(state => state.map((c) => c._id === card._id ? newCard : c))
      )
      .catch(console.error)
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() =>  setCards((state) => state.filter((item) => item._id !== card._id)))
      .catch(console.error)
  }

  function handleUpdateUser(user) {
    api.editProfile(user)
      .then(data => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(console.error)
  }

  function handleUpdateAvatar(user) {
    api.editAvatar(user)
      .then(data => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(console.error)
  }

  function handleAddPlaceSubmit(card) {
    api.addCard(card)
    .then(newCard => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch(console.error)
  }

  if (isLoading) {
    return <div>Загрузка...</div>
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">

        <Header 
          userData={userData}
          onLogOut={logOut}
        />

        <Routes>
          <Route
            path="*"
            element={
              isLoggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />
            }
          />
          <Route 
            path="/sign-in" 
            element={
              <Login 
               loginUser={loginUser}
              />
            } 
          />
          <Route
            path="/sign-up"
            element={
              <Register 
                registerUser={registerUser}
              />
            }
          />
          <Route 
            path="/"
            element={
              <ProtectedRouteElement 
                path="/"
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

        <InfoTooltip
          isOpen = {isInfoTooltipOpen}
          onClose = {closeAllPopups}
          name = 'infotooltip'
          imgPath = {message.imgPath}
          title = {message.title}
        />

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