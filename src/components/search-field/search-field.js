/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import './search-field.css';

const { Search } = Input;

export default class SearchField extends Component {
  static propTypes = {
    onSearch: PropTypes.func,
  };

  static defaultProps = {
    onSearch: () => {},
  };

  render() {
    const { onSearch } = this.props;
    return (
      <Search
        className="search-field"
        placeholder="Type to search..."
        onSearch={(evt) => {
          if (evt.length > 0) {
            onSearch(evt);
          }
        }}
      />
    );
  }
}
