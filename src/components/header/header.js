/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { Menu } from 'antd';
import PropTypes from 'prop-types';
import './header.css';

export default class Header extends Component {
  state = {
    current: 'search',
  };

  static propTypes = {
    guestRated: PropTypes.func,
    guestID: PropTypes.string.isRequired,
    changeTab: PropTypes.func,
  };

  static defaultProps = {
    guestRated: () => {},
    changeTab: () => {},
  };

  handleClick = (evt) => {
    const { changeTab } = this.props;
    this.setState({ current: evt.key });
    changeTab(evt.key);
  };

  render() {
    const { current } = this.state;
    const { guestRated, guestID } = this.props;
    // console.log(this.test)
    return (
      <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal" className="menu">
        <Menu.Item key="search" className="menu__item1">
          Search
        </Menu.Item>
        <Menu.Item key="rated" className="menu__item2" onClick={() => guestRated(guestID)}>
          Rated
        </Menu.Item>
      </Menu>
    );
  }
}
