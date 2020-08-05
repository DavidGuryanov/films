import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import './search-field.css';
import * as _ from 'lodash';

const { Search } = Input;

export default class SearchField extends Component {
  static propTypes = {
    onSearch: PropTypes.func,
    text: PropTypes.string,
  };

  static defaultProps = {
    onSearch: () => {},
    text: '',
  };

  constructor(props) {
    super(props);
    const { text, onSearch } = props;
    this.state = {
      query: text,
    };
    this.search = _.debounce(onSearch, 1000);
  }

  handleChange = ({ target: { value } }) => {
    this.setState(() => {
      return { query: value };
    });
    this.search(value);
  };

  render() {
    const { query } = this.state;
    return (
      <Search className="search-field" placeholder="Type to search..." onChange={this.handleChange} value={query} />
    );
  }
}
