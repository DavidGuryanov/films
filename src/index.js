/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import { Pagination, message, Button, Space } from 'antd';
import Header from './components/header/header';
import SearchField from './components/search-field/search-field';
import FilmsList from './components/films-list/filmsList';
import ApiService from './services/apiService';
import ErrorModal from './components/error-modal/errorModal';

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
    error: true,
  };

  api = new ApiService();

  calcPaginationWidth = () => {
    if (this.state.films.length > 0) {
      return { width: `${Math.round(this.state.films.length / 6) * 40 + 120}px` };
    }
    return { width: '120px' };
  };

showErrorPopup = (errorMessage) => {

  message.error(`Error. Can't get your data - ${errorMessage}`, 15);
  };

  onError = (err) => {
    this.setState({
      error: true,
      loading: false
    })
    if (err.message === 'Failed to fetch') {
      this.showErrorPopup(err.message)
    }

  }

  getFilms = (query) => {
    this.setState({
      loading: true,
    });
    this.api.getFilms(query).then((test) => {
      this.setState({
       // loading: true,
        films: test,
        currentPage: 1,
      });
      this.checkPage(1);
      this.onChange(1);
    }).then(() => {
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
    const n = 6;
    this.setState(({ films }) => {
      const a = films.slice((page - 1) * n, n * page);
      return {
        filmsToShow: a,
      };
    });
  };

  

  testClick(event) {
    this.checkPage(this.state.currentPage);
    this.getGenres();
    this.calcPaginationWidth();
  }

  render() {
    const { films, genresList, currentPage, filmsToShow, loading} = this.state;
    
    return (
      <div className="app-container" onLoad={() => this.testClick()}>
        <Header />
        <SearchField onSearch={this.getFilms} />
        
        <FilmsList films={filmsToShow} genres={genresList} loading={loading}/>

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

// default images
// mobile
// default date
