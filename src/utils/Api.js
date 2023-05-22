class Api{
  constructor({baseUrl, headers}) {
    this._url = baseUrl;
    this._headers = headers;
  }

  _getJson(res) {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._getJson);
  }

  getUserInfo() {
    return this._request(
      `${this._url}/users/me`, {
        headers: this._headers,
      }
    )
  }

  getInitialCards() {
    return this._request(
      `${this._url}/cards`, {
        headers: this._headers,
      }
    )
  }

  editProfile({name, about}) {
    return this._request(
      `${this._url}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          about: about,
        })
      }
    )
  }

  addCard({name, link}) {
    return this._request(
      `${this._url}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          link: link,
        })
      }
    )
  }

  deleteCard(id) {
    return this._request(
      `${this._url}/cards/${id}`, {
        method: "DELETE",
        headers: this._headers,
      }
    )
  }

  changeLikeCardStatus(id, isLiked) {
    return this._request(
      `${this._url}/cards/${id}/likes`, {
        method: `${isLiked ? "PUT" : "DELETE"}`,
        headers: this._headers,
      }
    )
  }

  editAvatar({avatar}) {
    return this._request(
      `${this._url}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar: avatar,
        })
      }
    )
  }
}

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort-61',
  headers: {
    authorization: 'dc4e7a03-585d-4419-af57-53fac49f94a8',
    'Content-Type': 'application/json'
  }
}); 

export { api };