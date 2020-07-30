/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Typography, Rate, Tag } from 'antd';
import { format } from 'date-fns';
import './filmCard.css';
import { Consumer } from '../context/context';

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
      rating: PropTypes.number,
    }),
  };

  static defaultProps = {
    film: {
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
      rating: 0,
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      src:
        'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg',
      width: 0,
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.state.width = window.innerWidth;
  }

  // componentWillMount(){
  //   this.setState({width: window.innerWidth});
  // }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth });
  }

  render() {
    const { film } = this.props;
    const { src, width } = this.state;
    let imgUrl = `https://image.tmdb.org/t/p/w200/${film.poster_path}`;
    if (!film.poster_path) {
      imgUrl =
        'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg';
    }
    let rDate;

    if (!film.release_date) {
      rDate = 'Release date unknown';
    } else {
      rDate = format(new Date(film.release_date), 'MMMM dd, yyyy');
    }

    function ratingColor(num) {
      switch (true) {
        case num < 3:
          return '#E90000';
        case num < 5:
          return '#E97E00';
        case num <= 7:
          return '#E9D100';
        default:
          return '#66E900';
      }
    }
    const badgeStyle = {
      border: `2px solid ${ratingColor(film.vote_average)}`,
    };

    const imagePlaceholder = () => {
      this.setState({ src: imgUrl });
    };

    if (width > 500) {
      return (
        <div className="card">
          <div className="card_l-col">
            <img className="card__img" src={src} onLoad={imagePlaceholder} alt={`Poster for ${film.original_title}`} />
          </div>
          <div className="card_r-col">
            <div className="flex-container">
              <h2 className="card__title">{film.original_title}</h2>
              <div className="card__badge" style={badgeStyle}>
                <p className="badge__num">{film.vote_average}</p>
              </div>
            </div>

            <Text type="secondary" className="card__date">
              {rDate}
            </Text>
            <Consumer>
              {([genres, rate, guestID]) => {
                let tags;
                if (film.genre_ids.length > 0) {
                  tags = film.genre_ids.map((el) => {
                    return (
                      <Tag className="tag" key={el}>
                        {genres[el]}
                      </Tag>
                    );
                  });
                } else {
                  tags = <Tag className="tag">No tags available</Tag>;
                }
                return (
                  <>
                    <div className="card__tags">{tags}</div>
                    <p className="card__description">{film.overview}</p>
                    <Rate
                      count={10}
                      allowHalf
                      defaultValue={film.rating}
                      className="card__rate"
                      onChange={(num) => rate(film.id, guestID, num, film)}
                    />
                  </>
                );
              }}
            </Consumer>
          </div>
        </div>
      );
    }
    return (
      <div className="card_s">
        <div className="top_s">
          <div className="card_l-col_s">
            <img
              className="card__img_s"
              src={src}
              onLoad={imagePlaceholder}
              alt={`Poster for ${film.original_title}`}
            />
          </div>
          <div className="card_r-col_s">
            <div className="flex-container_s" style={{ maxWidth: `${width - 132}px` }}>
              <h2 className="card__title_s">{film.original_title}</h2>
              <div className="card__badge" style={badgeStyle}>
                <p className="badge__num">{film.vote_average}</p>
              </div>
            </div>

            <Text type="secondary" className="card__date">
              {rDate}
            </Text>
            <Consumer>
              {([genres]) => {
                let tags;
                if (film.genre_ids.length > 0) {
                  tags = film.genre_ids.map((el) => {
                    return (
                      <Tag className="tag" key={el}>
                        {genres[el]}
                      </Tag>
                    );
                  });
                } else {
                  tags = <Tag className="tag">No tags available</Tag>;
                }
                return <div className="card__tags">{tags}</div>;
              }}
            </Consumer>
          </div>
        </div>
        <div className="bot_s">
          <Consumer>
            {([genres, rate, guestID]) => {
              return (
                <>
                  <p className="card__description">{film.overview}</p>
                  <Rate
                    count={10}
                    allowHalf
                    defaultValue={film.rating}
                    className="card__rate"
                    onChange={(num) => rate(film.id, guestID, num, film)}
                  />
                </>
              );
            }}
          </Consumer>
        </div>
      </div>
    );
  }
}
