/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import FilmCard from '../film-card/filmCard';
import './filmsList.css'

export default class FilmsList extends Component {
  state = {};

  render() {
    const { ids } = this.props;

    return (
      <div className="films-list">
        <FilmCard id={ids[0]} />
        <FilmCard id={ids[0]} />
        <FilmCard id={ids[0]} />
        <FilmCard id={ids[0]} />
        <FilmCard id={ids[0]} />
        <FilmCard id={ids[0]} />
      </div>
    );
  }
}
