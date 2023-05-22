import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import logoPath from '../images/logo.svg';

function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" src={logoPath} alt="Логотип Место" />
      <Routes>
        {/* Главная, если авторизован */}
        <Route exact path="/" element={
          <div className="header__info">
            <p className="header__email">{props.userData}</p>
            <button 
              className="header__button" 
              onClick={props.onLogOut}
            >
              Выйти
            </button>
          </div>
        } />
        {/* Ссылка страницы авторизации на регистрацию */}
        <Route exact path="/sign-in" element={
          <Link 
            to="/sign-up" 
            className="header__link"
          >
            Регистрация
          </Link>
        } />
        {/* Ссылка страницы регистрации на авторизацию */}
        <Route exact path="/sign-up" element={
          <Link 
            to="/sign-in" 
            className="header__link"
          >
            Войти
          </Link>
        } />
      </Routes>
    </header>
  )
}

export default Header;