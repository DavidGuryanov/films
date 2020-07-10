/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { Typography, Space, Rate, Tag } from 'antd';
import './filmCard.css';

const { Text, Link, Paragraph } = Typography;

export default class FilmCard extends Component {
  state = {};

  render() {
    const { id } = this.props;
    return (
      <div className="card">
        <div className="card_l-col">
          <img
            className="card__img"
            src="https://image.tmdb.org/t/p/w94_and_h141_bestv2/ylPnfaphW3FrLBUVwAREVtiL9My.jpg"
          />
        </div>
        <div className="card_r-col">
          <h2 className="card__title">Film title</h2>
          <Text type="secondary" className="card__date">
            March 5, 2020
          </Text>
          <div className="card__tags">
            <Tag className="tag">Action</Tag>
            <Tag className="tag">Drama</Tag>
          </div>
          <Paragraph ellipsis={{ rows: 5 }} className="card__description">
            A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction
            attempts to regain his soul and salvation by becoming the coach of a disparate ethnically mixed high school
            basketball team at his alma mater.
          </Paragraph>
          <Rate disabled allowHalf defaultValue={2.5} className="card__rate" />
        </div>
      </div>
    );
  }
}
