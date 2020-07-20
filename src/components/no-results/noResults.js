/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Result } from 'antd';
import { FrownOutlined } from '@ant-design/icons';

const NoResults = () => {
  return <Result status="warning" title="We looked everywhere but found nothing" icon={<FrownOutlined />} />;
};

export default NoResults;
