export default class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._userUrl = `${this._baseUrl}/users/me`;
        this._cardsUrl = `${this._baseUrl}/cards`;
        this._headers = headers
    }
    
    _checkRes(res) {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getUserData() {
        return fetch(this._userUrl, {
            method: 'GET',
            headers: this._headers,
        }).then(res => this._checkRes(res));
      }

    getCards() {
        return fetch(this._cardsUrl, {
            method: 'GET',
            headers: this._headers,
        }).then(res => this._checkRes(res));
    }

    setUserData(name, about) {
        return fetch(this._userUrl, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify({
            name,
            about
          })
        }).then(res => this._checkRes(res));
    }

    addCard(name, link) {
        return fetch(this._cardsUrl, {
          method: 'POST',
          headers: this._headers,
          body: JSON.stringify({
            name,
            link
          })
        }).then(res => this._checkRes(res));
    }

    deleteCard(cardId) {
        return fetch(`${this._baseUrl/cardId}`, {
          method: 'DELETE',
          headers: this._headers,
        }).then(res => this._checkRes(res));
    }

    addLike(cardId) {
        return fetch(`${this._cardsUrl/cardId}/likes`, {
          method: 'PUT',
          headers: this._headers
        }).then(res => this._checkRes(res));
    }

    deleteLike(cardId) {
        return fetch(`${this._cardsUrl/cardId}/likes`, {
          method: 'DELETE',
          headers: this._headers
        }).then(res => this._checkRes(res));
    }

    updateAvatar(avatar) {
        return fetch(`${this._userUrl}/avatar`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify({
            avatar
          })
        }).then(res => this._checkRes(res));
    }
}


/*.then((res) => {
          return res.json(); // В консоли окажется объект ответа от сервера
        }).then((res) => {
          console.log(res); // В консоли окажется объект ответа от сервера
        });*/