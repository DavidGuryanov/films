/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import { Pagination, message } from 'antd';
import Header from './components/header/header';
import SearchField from './components/search-field/search-field';
import FilmsList from './components/films-list/filmsList';
import ApiService from './services/apiService';

export default class App extends Component {
  state = {
    currentPage: 1,
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
    filmsToShow: [],
    loading: false,
  };

  api = new ApiService();

  calcPaginationWidth = () => {
    const { films } = this.state;
    if (films.length > 0) {
      return { width: `${Math.round(films.length / 6) * 40 + 120}px` };
    }
    return { width: '120px' };
  };

  showErrorPopup = (errorMessage) => {
    message.error(errorMessage, 15);
  };

  onError = (err) => {
    this.setState({
      loading: false,
    });
    if (err.message === 'Failed to fetch') {
      this.showErrorPopup(`Error. No connection - ${err.message}`);
    } else {
      this.showErrorPopup(`Error. ${err.message}`);
    }
  };

  getFilms = (query) => {
    this.setState({
      loading: true,
    });
    this.api
      .getFilms(query)
      .then((arrayOfFilms) => {
        this.setState({
          films: arrayOfFilms,
          currentPage: 1,
        });
        this.checkPage(1);
        this.onChange(1);
      })
      .then(() => {
        this.setState({
          loading: false,
        });
      })
      .catch(this.onError);
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

  onChange = (page) => {
    this.setState({
      currentPage: page,
    });
    this.checkPage(page);
  };

  checkPage = (page) => {
    const num = 6;
    this.setState(({ films }) => {
      const partOfFilms = films.slice((page - 1) * num, num * page);
      return {
        filmsToShow: partOfFilms,
      };
    });
  };

  toDoOnLoad() {
    const { currentPage } = this.state;
    this.checkPage(currentPage);
    this.getGenres();
    this.calcPaginationWidth();
  }

  render() {
    const { films, genresList, currentPage, filmsToShow, loading } = this.state;

    return (
      <div className="app-container" onLoad={() => this.toDoOnLoad()}>
        <Header />
        <SearchField onSearch={this.getFilms} />

        <FilmsList films={filmsToShow} genres={genresList} loading={loading} />

        <Pagination
          style={this.calcPaginationWidth()}
          className="paginator_3000"
          current={currentPage}
          onChange={this.onChange}
          pageSize={6}
          total={films.length}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));
