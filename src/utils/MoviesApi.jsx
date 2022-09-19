import { MOVIES_URL } from "../utils/constants";

class Movies {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // Запрос к сервису beatfilm-movies.
  getInitialMovies() {
    return fetch(this._baseUrl, {
      headers: this._headers,
    }).then(this._getResponseData);
  }

  // Если сервер вернул ошибку, отклоняем Промис
  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

// Подключение к Api
export const movi = new Movies({
  baseUrl: `${MOVIES_URL}/beatfilm-movies`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
