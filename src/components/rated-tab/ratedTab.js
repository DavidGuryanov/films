/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FilmCard from '../film-card/filmCard';

export default class RatedTab extends Component {
  state = {};

  static propTypes = {
    rated: PropTypes.arrayOf(PropTypes.object),
  };

  static defaultProps = {
    rated: [{}, {}],
  };

  render() {
    const { rated } = this.props;
    const ratedFilmsList = rated.map((item) => {
      return <FilmCard film={item} key={item.id} rated={rated} />;
    });
    return <div className="films-list">{ratedFilmsList}</div>;
  }
}
