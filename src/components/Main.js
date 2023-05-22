import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({onEditAvatar, onEditProfile, onAddPlace, cards, onCardClick, onCardLike, onCardDelete}) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">

      <section className="profile">
        <article className="profile__user">
          <div className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }} onClick={onEditAvatar}></div>
          <div className="profile__info">
            <div className="profile__name-container">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button type="button" aria-label="Редактировать профиль" className="profile__edit-button" onClick={onEditProfile} />
            </div>
            <p className="profile__about">{currentUser.about}</p>
          </div>
        </article>
        <button type="button" aria-label="Добавить" className="profile__add-button" onClick={onAddPlace} />
      </section>

      <section className="card-grid">
        <div className="card-grid__items"> 
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick = {onCardClick}
              onCardLike = {onCardLike}
              onCardDelete = {onCardDelete}
            />
          ))}
          
        </div>
      </section>

    </main>
  )
}

export default Main;