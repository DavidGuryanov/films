function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export default class ApiService {
  apiKey = '?api_key=6448d0a25066b0985b207ce9cbee6357';

  async getFilms(text, page = 1) {
    const urlBase = 'https://api.themoviedb.org/3/search/movie';
    const query = text.replace(/ /g, '+');
    const fullQuery = `&query=${query}`;
    const res = await fetch(`${urlBase}${this.apiKey}${fullQuery}&page=${page}`);
    if (!res.ok) {
      throw new Error(`SOME PROBLEM HERE PAL ${res.status}`);
    }
    const films = await res.json();
    return films;
  }

  async getGenres() {
    const urlBase = 'https://api.themoviedb.org/3/genre/movie/list';
    const res = await fetch(`${urlBase}${this.apiKey}`);
    if (!res.ok) {
      throw new Error(`SOME PROBLEM HERE PAL ${res.status}`);
    }
    const ge1nres = await res.json();
    return ge1nres.genres;
  }

  async createGuest() {
    const urlBase = 'https://api.themoviedb.org/3/authentication/guest_session/new';
    const res = await fetch(`${urlBase}${this.apiKey}`);
    if (!res.ok) {
      throw new Error(`SOME PROBLEM HERE PAL ${res.status}`);
    }
    const response = await res.json();
    return response;
  }

  async getGuestRatings(guestID) {
    const urlBase = 'https://api.themoviedb.org/3/guest_session/';
    const res = await fetch(`${urlBase}${guestID}/rated/movies${this.apiKey}`);
    if (!res.ok) {
      throw new Error(`SOME PROBLEM HERE PAL ${res}`);
    }
    const response = await res.json();
    return response;
  }

  async rateFilm(filmID, guestID, rating) {
    const urlBase = 'https://api.themoviedb.org/3/movie/';
    await fetch(`${urlBase}${filmID}/rating${this.apiKey}&guest_session_id=${guestID}`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({
        value: rating,
      }),
    })
      .then(handleErrors)
      .then((response) => response.json())
      .catch((error) => console.log(error));
  }
}
