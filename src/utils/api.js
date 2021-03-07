class Api {
    constructor(config){
this._baseUrl = config.baseUrl;
this._headers = config.headers;

    }


    _fetch(url, method, body) {
        return fetch(this._baseUrl + url, {
            method: method,
            headers:
            this._headers,
            body: body
        }).then(res => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

        
    getInitialCards() {
      return this._fetch('/cards', 'GET')
    }
  

  addUserCard(values) {
      return this._fetch('/cards', 'POST', JSON.stringify({
          name: values.name,
          link: values.link
      }))
  }

  takeCardLike(cardId) {
      return this._fetch(`/cards/likes/${cardId}`, 'PUT')
  }

  removeCardLke(cardId) {
      return this._fetch(`/cards/likes/${cardId}`, 'DELETE')
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
        return this.takeCardLike(cardId)
    } else {
        return this.removeCardLke(cardId)
    }
}


  delCard(cardId) {
      return this._fetch(`/cards/${cardId}`, 'DELETE')
  }

  getUserData() {
      return this._fetch('/users/me', 'GET')
  }

  patchUserData(values) {
      return this._fetch('/users/me', 'PATCH', JSON.stringify(
        {
          name: values.name,
          about: values.about
      }))
  }

  patchUserAvatar(values) {
      return this._fetch('/users/me/avatar', 'PATCH', JSON.stringify({
          avatar: values.avatar
      }))
  }

 
}


const api = new Api({
baseUrl: "https://mesto.nomoreparties.co/v1/cohort-18",
headers: {
  authorization: "1b98b7f8-c29f-4d66-ae18-3d1d376d7ed7",
  "Content-Type": "application/json"
}
});

export default api;