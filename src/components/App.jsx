// import { fetchImages } from "api/api";
import React, { Component } from "react";
import { SearchBar } from "./Searchbar/SearchBar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import axios from "axios";

axios.defaults.baseURL = 'https://pixabay.com/api/';

export class App extends Component {
  state = {
    items: [],
    query: '',
    isLoading: false,
    error: null,
  };

  // handleSubmit = event => {
  //   event.preventDefault();
  //   this.setState({
  //     page: 1,
  //     query: event.currentTarget.value,
  //     items: [],
  //   })
  //   event.target.reset();
  // }

  //     queryInput = event => {
  //   this.setState({ query: event.target.value });
  // };

  async componentDidMount() {
    this.setState({ isLoading: true });

    try {
      const response = await axios.get(`?q={query}&page={page}&key=31623736-4a8fa2402be59476e61396bec&image_type=photo&orientation=horizontal&per_page=12`);
      this.setState({ items: response.data.hits });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  render() {
 const { items, isLoading, error } = this.state;
    return (
      <div>
        <SearchBar  />
       {error && <p>Something went wrong: {error.message}</p>}
        {isLoading && <p>Loading...</p>}
        <ImageGallery items={items} />
        <Button />
      </div>
    );
  }
}