export class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    getProfile() {
        return fetch(`${this._url}users/me/`, {
            headers: this._headers
        }).then((res) => {
            if(res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        })
    }

    updateProfile(data) {
        return fetch(`${this._url}users/me/`, {
            headers: this._headers,
            method: "PATCH",
            body: JSON.stringify(data)
        }).then((res) => {
            if(res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        })
    }

    changeAvatar(data) {
        return fetch(`${this._url}users/me/avatar`, {
            headers: this._headers,
            method: "PATCH",
            body: JSON.stringify(data)
        }).then((res) => {
            if(res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        })
    }

    getInitialCards() {
        return fetch(`${this._url}cards`, {
            headers: this._headers
        }).then((res) => {
            if(res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        })
    }

    postCard(data) {
        return fetch(`${this._url}cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify(data)
        }).then((res) => {
            if(res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        })
    }

    putLike(evt, cardId) {
        return fetch(`${this._url}cards/likes/${cardId}`, {
            method: "PUT",
            headers: this._headers,
        }).then((res) => {
            if(res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        })
    }

    deleteLike(evt, cardId) {
        return fetch(`${this._url}cards/likes/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
        }).then((res) => {
            if(res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        })
    }

    removeCard(cardId) {
        return fetch(`${this._url}cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
        }).then((res) => {
            if(res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        })
    }
}