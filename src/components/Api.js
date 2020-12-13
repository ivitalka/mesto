export class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    _getResponseData(res) {
        if(!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }

    getProfile() {
        return fetch(`${this._url}users/me`, {
            headers: this._headers
        }).then((res) => {
            return this._getResponseData(res);
        })
    }

    updateProfile(data) {
        return fetch(`${this._url}users/me`, {
            headers: this._headers,
            method: "PATCH",
            body: JSON.stringify(data)
        }).then((res) => {
            return this._getResponseData(res);
        })
    }

    changeAvatar(data) {
        return fetch(`${this._url}users/me/avatar`, {
            headers: this._headers,
            method: "PATCH",
            body: JSON.stringify(data)
        }).then((res) => {
            return this._getResponseData(res);
        })
    }

    getInitialCards() {
        return fetch(`${this._url}cards`, {
            headers: this._headers
        }).then((res) => {
            return this._getResponseData(res);
        })
    }

    postCard(data) {
        return fetch(`${this._url}cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify(data)
        }).then((res) => {
            return this._getResponseData(res);
        })
    }

    putLike(cardId) {
        return fetch(`${this._url}cards/likes/${cardId}`, {
            method: "PUT",
            headers: this._headers,
        }).then((res) => {
            return this._getResponseData(res);
        })
    }

    deleteLike(cardId) {
        return fetch(`${this._url}cards/likes/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
        }).then((res) => {
            return this._getResponseData(res);
        })
    }

    removeCard(cardId) {
        return fetch(`${this._url}cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
        }).then((res) => {
            return this._getResponseData(res);
        })
    }
}