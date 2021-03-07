import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';



function Card({card, onCardClick, onCardLike, onCardDelete }) {

      //Контекст
      const currentUser = React.useContext(CurrentUserContext);

      const isOwn = card.owner._id === currentUser._id;

      const cardDeleteButtonClassName = (
        `grid__delete-btn ${!isOwn && 'grid__delete-btn_hidden'}`
      ); 

      const isLiked = card.likes.some(i => i._id === currentUser._id);

      const cardLikeButtonClassName = (
        `grid__like-btn ${isLiked && 'grid__like_active-btn'}`
      ); 


      function handleLikeClick() {
        onCardLike(card);
      }
    
      function handleCardDelete() {
        onCardDelete(card);
      }

      function handleClick() {
        onCardClick(card);
      } 

  
    return (
        <li className="grid__item">
        <button className={cardDeleteButtonClassName} type="button" onClick={handleCardDelete}/>
        <img src={card.link} alt={card.name} className="grid__image" onClick={handleClick} />
        <div className="grid__text-container">
          <h2 className="grid__text">{card.name}</h2>
          <div className="grid__like-container">
            <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}/>
            <div className="grid__like-counter">{card.likes.length}</div>
          </div>
        </div>
      </li>  
      )
  }


export default Card;