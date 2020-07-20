/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Pagination } from 'antd';
import PropTypes from 'prop-types';
import './paginator.css';

function Paginator(props) {
  const { onChange, total, currentPage } = props;
  return (
    <Pagination
      className="paginator_3000"
      current={currentPage}
      onChange={onChange}
      pageSize={6}
      total={total}
      hideOnSinglePage
      showSizeChanger={false}
    />
  );
}

Paginator.propTypes = {
  onChange: PropTypes.func,
  total: PropTypes.number,
  currentPage: PropTypes.number,
};

Paginator.defaultProps = {
  currentPage: 1,
  total: 1,
  onChange: () => {},
};

export default Paginator;
