import PropTypes from 'prop-types';
import React, { Component } from 'react'

export default class Searchbar extends Component {
    state ={
        query: '',
    }

    onChange = event => {
        this.setState({ query: event.target.value });
        
      };
    
      onSubmit = event => {
        event.preventDefault();
        this.props.onSubmit(this.state.query);
        this.setState({ query: '' });
        
      };

  render() {
    return (
    <header className="searchbar">
    <form className="form" onSubmit={this.onSubmit}>
      <button type="submit" className="button" >
        <span className="button-label">Search</span>
      </button>
  
      <input
        className="input"
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
        onChange={this.onChange}
      />
    </form>
  </header>
      
    )
  }
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}