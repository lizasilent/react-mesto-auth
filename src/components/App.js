import React from "react";
import { useHistory, Route, Switch } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import * as auth from '../utils/api2.js';
import api from "../utils/api";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from './InfoTooltip';
import Page404 from "./Page404";
import ProtectedRoute from "./ProtectedRoute";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import sucessLogoPath from "../images/sucesspopup.png";
import failLogoPath from "../images/failpopup.png";

function App() {

  //Открытие попапов 
  const [isEditProfilePopupOpen, setIsEditPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const history = useHistory();
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = React.useState(false);
  const [message, setMessage] = React.useState({ iconPath: '', text: '' });
  const [email, setEmail] = React.useState('');


  const handleInfoTooltipContent = ({iconPath, text}) => {
    setMessage({ iconPath: iconPath, text: text })
  }
  
  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.getContent(jwt)
        .then((res) => {
          setLoggedIn(true);
          setEmail(res.data.email);
          history.push('/');
        })
        .catch(err => console.log(err));
    }
  }, [history]);


    const handleLogin = (email, password) => {
      auth.authorize(email, password)
      .then(() => {
          setEmail(email);
          setLoggedIn(true);
        history.push('/');
        })
        .catch((err) => console.log(err));
    }
   
    const handleRegister = (email, password) => {
      auth.register(email, password)
      .then((res) => {
        setIsRegisterPopupOpen(true);
        handleInfoTooltipContent({iconPath: sucessLogoPath, text: "Вы успешно зарегистрировались!"});
        setTimeout(history.push, 3000, "/sign-in");
        setTimeout(closeAllPopups, 2500);

        if (res.status === 201 || res.status === 200) {
          setIsRegisterPopupOpen(true);
          handleInfoTooltipContent({iconPath: sucessLogoPath, text: "Вы успешно зарегистрировались!"});
          setTimeout(history.push, 3000, "/sign-in");
          setTimeout(closeAllPopups, 2500);
      }

      if (res.status === 400) {
        console.log("Такой email уже существует")
      }
      
    }).catch((err) => {
    setIsRegisterPopupOpen(true);
    handleInfoTooltipContent({iconPath: failLogoPath, text: "Что-то пошло не так! Попробуйте ещё раз."});
    setTimeout(closeAllPopups, 2500);
    console.log("Ошибка регистрации: " + err);
    })}
  
    const handleLogout = () => {

      setLoggedIn(false);
      localStorage.removeItem('jwt');
      setEmail('');
      history.push('/sign-in');
    }

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
      setIsRegisterPopupOpen(false);
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
              <Header loggedIn={loggedIn} email={email} handleLogout={handleLogout}/>
              <Switch>
              {<ProtectedRoute exact path="/" loggedIn={loggedIn} component={Main}
                    onEditProfile={handleEditProfileClick} 
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                     />}

    <Route path="/sign-in">
        <Login handleLogin={handleLogin} />
      </Route>
      <Route path="/sign-up">
        <Register handleRegister={handleRegister}/>
      </Route>
      <Route path="/*">
        <Page404 />
      </Route>
          </Switch>
              <ImagePopup card={selectedCard} onClose={closeAllPopups} />
              <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
              <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
              <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
              <PopupWithForm name="type_submit" title="Вы уверены?" buttonTitle="Да"/>
              <InfoTooltip isOpen={isRegisterPopupOpen} onClose={closeAllPopups} message={message} />
          </div>
        </div>

      </CurrentUserContext.Provider>
  );
};
  

export default App;
