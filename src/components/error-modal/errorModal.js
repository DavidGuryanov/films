/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { render } from '@testing-library/react';
import { Modal, Button, Space , message , Alert} from 'antd';



const ErrorModal = () => {
   
    return (
        <Alert message="Error" type="error" showIcon />
    )
}

export default ErrorModal;