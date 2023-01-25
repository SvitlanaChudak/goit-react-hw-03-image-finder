import React, { Component } from 'react';

export class SearchBar extends Component {
  state = {
    searchQuery: '',
  };

  onChange = event => {
    this.setState({
      searchQuery: event.currentTarget.value.toLowerCase(),
    });
  };

  onSubmit = event => {
    event.preventDefault();
    if (this.state.searchQuery.trim() === '') {
      return alert('Please enter something');
    }
    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
<header >
   <form onSubmit={this.onSubmit}>
     <button type="submit">
       <span >Search</span>
    </button>

    <input
      type="text"
      name="searchQuery"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
      value={this.state.searchQuery}
      onChange={this.onChange}
    />
  </form>
</header>
    );
  }
}
