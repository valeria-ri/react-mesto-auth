import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">

      <section className="profile">
        <article className="profile__user">
          <div className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }} onClick={props.onEditAvatar}></div>
          <div className="profile__info">
            <div className="profile__name-container">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button type="button" aria-label="Редактировать профиль" className="profile__edit-button" onClick={props.onEditProfile}></button>
            </div>
            <p className="profile__about">{currentUser.about}</p>
          </div>
        </article>
        <button type="button" aria-label="Добавить" className="profile__add-button" onClick={props.onAddPlace}></button>
      </section>

      <section className="card-grid">
        <div className="card-grid__items"> 
          {props.cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick = {props.onCardClick}
              onCardLike = {props.onCardLike}
              onCardDelete = {props.onCardDelete}
            />
          ))}
          
        </div>
      </section>

    </main>
  )
}

export default Main;