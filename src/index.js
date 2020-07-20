/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import { message } from 'antd';
import Header from './components/header/header';
import SearchField from './components/search-field/search-field';
import FilmsList from './components/films-list/filmsList';
import ApiService from './services/apiService';
import NoResults from './components/no-results/noResults';
import Paginator from './components/paginator/paginator';

export default class App extends Component {
  state = {
    currentPage: 1,
    genresList: {},
    films: [],
    filmsToShow: [],
    loading: false,
    maxPage: 1,
    queryPage: 1,
    textQuery: '',
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
          films: arrayOfFilms.results,
          currentPage: 1,
          maxPage: arrayOfFilms.total_pages,
          queryPage: arrayOfFilms.page,
          textQuery: query,
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

  appendFilms = (txt, page) => {
    this.api.getFilms(txt, page).then((arrayOfFilms) => {
      this.setState(({ films }) => {
        const newFilmsArray = [...films];
        newFilmsArray.push(...arrayOfFilms.results);

        return {
          films: newFilmsArray,
        };
      });
    });
  };

  onChange = (page) => {
    const { queryPage, maxPage, textQuery } = this.state;
    if (page > 1 && queryPage !== maxPage) {
      this.setState(() => {
        const newqueryPage = queryPage + 1;
        return {
          queryPage: newqueryPage,
        };
      });

      this.appendFilms(textQuery, queryPage + 1);
    }

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

  notFound = () => {
    const { films, textQuery } = this.state;
    if (films.length === 0 && textQuery.length > 0) {
      return <NoResults />;
    }
    return null;
  };

  toDoOnLoad() {
    const { currentPage } = this.state;
    this.checkPage(currentPage);
    this.getGenres();
    this.calcPaginationWidth();
  }

  render() {
    const { films, genresList, currentPage, filmsToShow, loading } = this.state;
    //  console.log(this.state)

    return (
      <div className="app-container" onLoad={() => this.toDoOnLoad()}>
        <Header />
        <SearchField onSearch={this.getFilms} />

        <FilmsList films={filmsToShow} genres={genresList} loading={loading} />
        <this.notFound />
        <Paginator onChange={this.onChange} currentPage={currentPage} total={films.length} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));
