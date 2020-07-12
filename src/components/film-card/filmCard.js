/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Typography, Rate, Tag } from 'antd';
import { format } from 'date-fns';
import './filmCard.css';

const { Text } = Typography;

export default class FilmCard extends Component {
  static propTypes = {
    film: PropTypes.shape({
      popularity: PropTypes.number,
      vote_count: PropTypes.number,
      video: PropTypes.bool,
      poster_path: PropTypes.string,
      id: PropTypes.number,
      adult: PropTypes.bool,
      backdrop_path: PropTypes.string,
      original_language: PropTypes.string,
      original_title: PropTypes.string,
      genre_ids: PropTypes.arrayOf(PropTypes.number),
      title: PropTypes.string,
      vote_average: PropTypes.number,
      overview: PropTypes.string,
      release_date: PropTypes.string,
    }),
    // eslint-disable-next-line react/forbid-prop-types
    genres: PropTypes.object,
  };

  static defaultProps = {
    film: [
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
    genres: {},
  };

  state = {};

  render() {
    const { film, genres } = this.props;
    const imgUrl = `https://image.tmdb.org/t/p/w200/${film.poster_path}`;
    function ratingColor(num) {
      if (num < 4) {
        return 'red';
      }
      if (num < 6) {
        return 'orange';
      }
      if (num < 7) {
        return '#E9D100';
      }
      return 'green';
    }
    const badgeStyle = {
      border: `2px solid ${ratingColor(film.vote_average)}`,
    };

    const tags = film.genre_ids.map((el) => {
      return <Tag className="tag">{genres[el]}</Tag>;
    });
    return (
      <div className="card">
        <div className="card__badge2" style={badgeStyle}>
          <p className="badge__num">{film.vote_average}</p>
        </div>
        {/* <Badge count={film.vote_average} className="card__badge"/> */}
        <div className="card_l-col">
          <img className="card__img" src={imgUrl} alt={`Poster for ${film.original_title}`} />
        </div>
        <div className="card_r-col">
          <h2 className="card__title">{film.original_title}</h2>
          <Text type="secondary" className="card__date">
            {format(new Date(film.release_date), 'MMMM dd, yyyy')}
          </Text>
          <div className="card__tags">{tags}</div>
          <p className="card__description">{film.overview}</p>
          {/* <Paragraph ellipsis={{ rows: 5 }} className="card__description">
            {film.overview}
          </Paragraph> */}
          <Rate disabled count={10} allowHalf defaultValue={film.vote_average} className="card__rate" />
        </div>
      </div>
    );
  }
}
