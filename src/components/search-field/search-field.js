/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import './search-field.css';
import * as _ from 'lodash';

const { Search } = Input;

export default class SearchField extends Component {
  static propTypes = {
    onSearch: PropTypes.func,
  };

  static defaultProps = {
    onSearch: () => {},
  };

  search = _.debounce(this.props.onSearch, 1000);

  handleChange = ({ target: { value } }) => {
    if (value.length > 3) {
      this.search(value);
    }
  };

  render() {
    return <Search className="search-field" placeholder="Type to search..." onChange={this.handleChange} />;
  }
}
