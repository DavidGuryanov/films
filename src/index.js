/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import { message } from 'antd';
import Header from './components/header/header';
import SearchField from './components/search-field/search-field';
import RatedTab from './components/rated-tab/ratedTab';
import FilmsList from './components/films-list/filmsList';
import ApiService from './services/apiService';
import NoResults from './components/no-results/noResults';
import Paginator from './components/paginator/paginator';
import { Provider } from './components/context/context';

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
    guestID: '',
    // eslint-disable-next-line react/no-unused-state
    rated: [],
    pseudoRated: [],
    currentTab: 'search',
  };

  api = new ApiService();

  componentDidMount() {
    this.getGenres();
    const { currentPage } = this.state;
    this.checkPage(currentPage);
    this.createGuest();
  }

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

  createGuest = () => {
    this.api.createGuest().then((result) => {
      this.setState(() => {
        return {
          guestID: result.guest_session_id,
        };
      });
    });
  };

  getRatedFilms = (guestID) => {
    this.api.getGuestRatings(guestID).then((result) => {
      this.setState(() => {
        return {
          rated: result.results,
        };
      });
    });
  };

  rateFilm = (filmID, guestID, rating, fullInfo) => {
    this.api.rateFilm(filmID, guestID, rating).then(() => {
      this.setState(({ pseudoRated }) => {
        const newRatedArray = [...pseudoRated];
        const newInfo = JSON.parse(JSON.stringify(fullInfo));
        if (newRatedArray.findIndex((value) => value.id === fullInfo.id) === -1) {
          newInfo.rating = rating;
          newRatedArray.push(newInfo);
        } else {
          const index = newRatedArray.findIndex((value) => value.id === fullInfo.id);
          newRatedArray[index].rating = rating;
        }
        return {
          pseudoRated: newRatedArray,
        };
      });
    });
  };

  changeTab = (tab) => {
    this.setState(() => {
      return {
        currentTab: tab,
      };
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

  render() {
    const { films, genresList, currentPage, filmsToShow, loading, guestID, pseudoRated, currentTab } = this.state;
    return (
      <div className="app-container">
        <Provider value={[genresList, this.rateFilm, guestID]}>
          <Header guestRated={this.getRatedFilms} rated={pseudoRated} guestID={guestID} changeTab={this.changeTab} />
          {currentTab === 'search' ? (
            <>
              <SearchField onSearch={this.getFilms} />
              <FilmsList films={filmsToShow} loading={loading} rated={pseudoRated} />
              <Paginator onChange={this.onChange} currentPage={currentPage} total={films.length} />
            </>
          ) : (
            <RatedTab rated={pseudoRated} />
          )}

          <this.notFound />
        </Provider>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));
