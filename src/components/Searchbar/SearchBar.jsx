import React, { Component } from 'react';
import { Header, SearchForm, FormButton, Input, Span } from './SearchBar.styled';

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
<Header >
   <SearchForm onSubmit={this.onSubmit}>
     <FormButton type="submit">
       <Span >Search</Span>
    </FormButton>

    <Input
      type="text"
      name="searchQuery"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
      value={this.state.searchQuery}
      onChange={this.onChange}
    />
  </SearchForm>
</Header>
    );
  }
}
