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
    // console.log(films, films.results)
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
}
