/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import { DatePicker, Button } from 'antd';
import 'antd/dist/antd.css';

import Header from './components/header/header';
import SearchField from './components/search-field/search-field'
import FilmsList from './components/films-list/filmsList';

export default class App extends Component {
  state = {
    filmsIdArray: [1, 2, 3],
  };

  render() {
    return (
      <div className="app-container">
        <Header />
        <SearchField/>
        <FilmsList ids={this.state.filmsIdArray} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));
