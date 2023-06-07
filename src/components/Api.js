export class Api {
    constructor({ url, headers }) {
        this._url = url;
        this._headers = headers;
    }


    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }



    getInitialCards() {
        return fetch(`${this._url}/cards`, { headers: this._headers })
        .then((res) => this._checkResponse(res))
    }



    addNewCard({ name, link }) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
        .then((res) => this._checkResponse(res))
    }



    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
        })
        .then((res) => this._checkResponse(res))
    }

    //Поставить лайк карточке

    addLikeCard(cardId) {
        return fetch(`${this._url}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: this._headers,
        })
        .then((res) => this._checkResponse(res))
    }

 

    deleteLikeCard(cardId) {
        return fetch(`${this._url}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
        })
        .then((res) => this._checkResponse(res))
    }

    

    getUserInfo() {
        return fetch(`${this._url}/users/me`, { headers: this._headers })
        .then((res) => this._checkResponse(res))
    }

    

    editUserInfo({ name, profession }) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: profession
            })
        })
        .then((res) => this._checkResponse(res))
    }

    //Отредактировать аватар пользователя

    editAvatarUser({ avatar }) {    
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatar
            })
        })
        .then((res) => this._checkResponse(res))
    }
}

