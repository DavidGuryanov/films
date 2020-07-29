/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import FilmCard from '../film-card/filmCard';
import '../film-card/filmCard.css';

import './filmsList.css';

const antIcon = <LoadingOutlined style={{ fontSize: 120 }} spin />;

const loadingPlaceholder = (
  <div className="card">
    <div className="card_l-col">
      <img
        className="card__img"
        src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
        alt="Poster for placeholder"
      />
    </div>
    <div className="card_r-col">
      <div className="card__description" style={{ paddingLeft: '50px', paddingTop: '70px', maxHeight: '211px' }}>
        <Spin indicator={antIcon} size="large" />
      </div>
    </div>
  </div>
);

export default class FilmsList extends Component {
  static propTypes = {
    films: PropTypes.arrayOf(PropTypes.object),
    loading: PropTypes.bool,
    rated: PropTypes.arrayOf(PropTypes.object),
  };

  static defaultProps = {
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
    loading: false,
    rated: [],
  };

  state = {};

  render() {
    const { films, loading, rated } = this.props;

    if (loading) {
      return <div className="films-list">{loadingPlaceholder}</div>;
    }
    const filmsList = films.map((item) => {
      const clonedItem = JSON.parse(JSON.stringify(item));
      rated.map((ratedFilm) => {
        if (ratedFilm.id === item.id) {
          clonedItem.rating = ratedFilm.rating;
        }
        return null;
      });
      return <FilmCard film={clonedItem} key={item.id} rated={rated} />;
    });
    return <div className="films-list">{filmsList}</div>;
  }
}
