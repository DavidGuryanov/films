function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
const apiKey = '?api_key=6448d0a25066b0985b207ce9cbee6357';
export default class ApiService {
  static async getFilms(text, page = 1) {
    if (text.length === 0) {
      return {
        page: 1,
        results: [],
        total_pages: 0,
        total_results: 0,
      };
    }
    const urlBase = 'https://api.themoviedb.org/3/search/movie';
    const query = text.replace(/ /g, '+');
    const fullQuery = `&query=${query}`;
    const res = await fetch(`${urlBase}${apiKey}${fullQuery}&page=${page}`);
    if (!res.ok) {
      throw new Error(`SOME PROBLEM HERE PAL ${res.status}`);
    }
    const films = await res.json();
    return films;
  }

  static async getGenres() {
    const urlBase = 'https://api.themoviedb.org/3/genre/movie/list';
    const res = await fetch(`${urlBase}${apiKey}`);
    if (!res.ok) {
      throw new Error(`SOME PROBLEM HERE PAL ${res.status}`);
    }
    const ge1nres = await res.json();
    return ge1nres.genres;
  }

  static async createGuest() {
    const urlBase = 'https://api.themoviedb.org/3/authentication/guest_session/new';
    const res = await fetch(`${urlBase}${apiKey}`);
    if (!res.ok) {
      throw new Error(`SOME PROBLEM HERE PAL ${res.status}`);
    }
    const response = await res.json();
    return response;
  }

  static async getGuestRatings(guestID) {
    const urlBase = 'https://api.themoviedb.org/3/guest_session/';
    const res = await fetch(`${urlBase}${guestID}/rated/movies${apiKey}`);
    if (!res.ok) {
      throw new Error(`SOME PROBLEM HERE PAL ${res}`);
    }
    const response = await res.json();
    return response;
  }

  static async rateFilm(filmID, guestID, rating) {
    const urlBase = 'https://api.themoviedb.org/3/movie/';
    await fetch(`${urlBase}${filmID}/rating${apiKey}&guest_session_id=${guestID}`, {
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
