import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
// import InfoTooltip from "./InfoTooltip";
// import ProtectedRoute from "./ProtectedRoute";
import api from "../utils/api";
import { CurrentUserContext } from '../contexts/CurrentUserContext';



function App() {

  //Открытие попапов 
  const [isEditProfilePopupOpen, setIsEditPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(false);

  // Стейт, отвечающий за данные текущего пользователя
  const [currentUser, setCurrentUser] = React.useState({ name: 'Gudetama', about: "lazylazy", avatar: "https://i.pinimg.com/originals/37/04/ef/3704efd795fcee0461946434db3c92c2.jpg" });

    React.useEffect(() => {
      api.getUserData().then((userData) => {
        setCurrentUser(userData)
      }).catch((err) => {
          console.log("Не загрузился юзер: " + err);
      });
    }, []);


      function handleEditProfileClick() {
        setIsEditPopupOpen(true);
      }
    
      function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
      }

      function handleEditAvatarClick(){
        setIsEditAvatarPopupOpen(true);
      }

      function handleCardClick(card) {
        setSelectedCard(card);
      }

     // Закрытие попапов
     function closeAllPopups() {
      setIsEditPopupOpen(false);
      setIsAddPlacePopupOpen(false);
      setIsEditAvatarPopupOpen(false);
      setSelectedCard(false);
    }


    // Обновление информации о текущем юзере
    function handleUpdateUser(values) {
      api.patchUserData(values).then(userData => {
        setCurrentUser(userData);
        closeAllPopups();
      }).catch((err) => {
          console.log("Не загрузить описание профиля: " + err);
      })
    } 

    function handleUpdateAvatar(values) {
      api.patchUserAvatar(values).then(userData => {
        setCurrentUser(userData);
        closeAllPopups();
      }).catch((err) => {
          console.log("Не загрузить аватар: " + err);
      })
    }
   

    //Карточки и все, что с ними связано

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {

    api.getInitialCards().then(cardList => setCards(cardList)
      ).catch((err) => {
          console.log("Не загрузились карточки: " + err);
      });
    }, []);
    

    function handleAddPlaceSubmit(data) {
      api.addUserCard(data).then((newCard) => {setCards([newCard, ...cards]);
      closeAllPopups()}
      ).catch((err) => {
          console.log("Не добавить карточку: " + err);
      })
    }


    function handleCardLike(card) {
      const isLiked = card.likes.some(i => i._id === currentUser._id);
      api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
      }).catch((err) => {
        console.log("Не поставить лайк: " + err);
    })
    } 

      function handleCardDelete(card) {
        api.delCard(card._id).then(() => {
        const newCardsTemplate = cards.filter((c) => c._id !== card._id);
        setCards(newCardsTemplate);
    }).catch((err) => {
          console.log("Не удаляется карточка: " + err); 
    }) 
    }

    
      return (
        
      <CurrentUserContext.Provider value={currentUser}>
      
        <div className="page">
          <div className="page__content">

              <Header />
              <Main onEditProfile={handleEditProfileClick} 
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}/>
              <Footer />
              <ImagePopup card={selectedCard} onClose={closeAllPopups} />
              <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
              <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
              <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
              <PopupWithForm name="type_submit" title="Вы уверены?" buttonTitle="Да"/>
{/* 
              <ProtectedRoute/>  */}
               
          </div>
        </div>
      </CurrentUserContext.Provider>
  );

  
};
  

export default App;
