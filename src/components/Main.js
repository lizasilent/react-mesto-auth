import React from "react"
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from "./Card"


function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete}) {

  
    //Контекст

  const currentUserInfo = React.useContext(CurrentUserContext);
        
    return (
        <main className="content">
        <section className="profile">
          <div className="profile__box">
            <div className="profile__avatar" onClick={onEditAvatar} style={{ backgroundImage: `url(${currentUserInfo.avatar})` }} />
            <div className="profile__text-content">
              <h1 className="profile__name">{currentUserInfo.name}</h1>
              <button className="profile__edit-btn" type="button" onClick={onEditProfile}/>
              <p className="profile__description">{currentUserInfo.about}</p>
            </div>
          </div>
          <button className="profile__add-btn" type="button" onClick={onAddPlace} />
        </section>
        
        <section className="grid">
          <ul className="grid__template">
          
          {cards.map((card) => (<Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />))}
            
           
          </ul>
        </section>
      </main>
    )
}



export default Main;