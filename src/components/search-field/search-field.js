/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { Input } from 'antd';
import './search-field.css'

const { Search } = Input;

export default class SearchField extends Component {

    render() {

        return (
            
<Search className="search-field"
      placeholder="Type to search..."
      onSearch={value => console.log(value)}
      
    />
        )
    }
        
    
} 