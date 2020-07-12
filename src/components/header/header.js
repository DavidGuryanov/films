/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { Menu } from 'antd';
import './header.css';

export default class Header extends Component {
  state = {
    current: 'search',
  };

  handleClick = (evt) => {
    this.setState({ current: evt.key });
  };

  render() {
    const { current } = this.state;
    return (
      <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal" className="menu">
        <Menu.Item key="search" className="menu__item1">
          Search
        </Menu.Item>
        <Menu.Item key="rated" className="menu__item2">
          Rated
        </Menu.Item>
      </Menu>
    );
  }
}
