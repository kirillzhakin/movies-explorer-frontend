import { MAIN_URL } from "../utils/constants";

class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  //  1. Загрузка информации о пользователе с сервера
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._getResponseData);
  }

  // 2. Возвращает все сохранённые текущим пользователем фильмы
  getSavedMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      headers: this._headers,
    }).then(this._getResponseData);
  }

  // 3. Редактирование профиля
  setUserInfo(token, name, email) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    }).then(this._getResponseData);
  }

  // 4. Сохраненный фильм с переданными в теле данными
  addMovies(movie, token) {
    return fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        country: movie.country || " ",
        director: movie.director || " ",
        duration: movie.duration || 0,
        year: movie.year || " ",
        description: movie.description || " ",
        image: movie.image || " ",
        trailerLink: movie.trailerLink || " ",
        nameRU: movie.nameRU || " ",
        nameEN: movie.nameEN || " ",
        thumbnail: movie.thumbnail || " ",
        movieId: movie.movieId,
      }),
    }).then(this._getResponseData);
  }

  // 5. Удаляет сохранённый фильм по id
  deleteMovies(movieId, token) {
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
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

const token = localStorage.getItem("token");

// Подключение к Api
export const main = new MainApi({
  baseUrl: MAIN_URL,
  headers: {
    Accept: "application/json",
    authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});
