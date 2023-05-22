import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = ( 
    `card__like ${isLiked && 'card__like_active'}` 
  );

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return(
    <div className="card">
      <img 
        className="card__image" 
        src={props.card.link} 
        alt={props.card.name}
        onClick={handleClick}
      />
      {isOwn && 
        <button 
          type="button" 
          aria-label="Удалить" 
          className="card__delete"
          onClick={handleDeleteClick}
        />
      } 
      <div className="card__caption">
        <h2 className="card__title">{props.card.name}</h2>
        <div className="card__like-container">
          <button 
            type="button" 
            aria-label="Нравится" 
            className={cardLikeButtonClassName} 
            onClick={handleLikeClick}>
          </button>
          <p className="card__like-count">{props.card.likes.length}</p>
        </div>
      </div>
    </div>
  )
}

export default Card;