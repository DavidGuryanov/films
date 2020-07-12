/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';

import Header from './components/header/header';
import SearchField from './components/search-field/search-field';
import FilmsList from './components/films-list/filmsList';
import ApiService from './services/apiService';

export default class App extends Component {
  state = {
    genresList: {},
    films: [
      {
        popularity: 4.158,
        vote_count: 31,
        video: false,
        poster_path: '/7zOAA4IygobEpu0E4yLVWv9Htsk.jpg',
        id: 132030,
        adult: false,
        backdrop_path: '/evUhOMCfzM6fGhGnpcUYHnYyshJ.jpg',
        original_language: 'ru',
        original_title: 'Зелёный слоник',
        genre_ids: [18, 27, 53],
        title: 'The Green Elephant',
        vote_average: 6.2,
        overview:
          'The movie is set in the brig, the walls of which are painted in a poisonous green color. There fall into two junior officers, Sergei "Fallen" Pakhomov and Vladimir "Little brother"  Epifantsev. So, both lieutenant begin their dialogue. The dialogue began with a discussion of various philosophical problems, as well as the stories of two army lieutenants. Afterwards, "Fallen” starts to turn the conversation in a completely different direction, telling the "Little brother" of how he first had sex with a drunken woman, about how he ejaculated at her face, and then he defecating in the sea, and also how during his urgent service he just did not become a queer...',
        release_date: '1999-01-01',
      },
    ],
  };

  api = new ApiService();

  getFilms = (query) => {
    this.api.getFilms(query).then((test) => {
      this.setState({
        films: test,
      });
    });
  };

  getGenres = () => {
    this.api.getGenres().then((result) => {
      const mapped = result.map((item) => ({ [item.id]: item.name }));
      const newObj = Object.assign({}, ...mapped);
      this.setState({
        genresList: newObj,
      });
    });
  };

  render() {
    const { films, genresList } = this.state;
    return (
      <div className="app-container" onLoad={() => this.getGenres()}>
        <Header />
        <SearchField onSearch={this.getFilms} />
        <FilmsList films={films} genres={genresList} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));
