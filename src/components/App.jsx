import React, { Component } from "react";
import { fetchImages } from "services/api";
import { SearchBar } from "./Searchbar/SearchBar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Modal } from "./Modal/Modal";
import { Loader } from './Loader/Loader';
import { animateScroll } from 'react-scroll';
import { Container } from "./App.styled";


export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    page: 1,
    per_page: 12,
    isLoading: false,
    loadMore: false,
    error: null,
    showModal: false,
    largeImageURL: 'largeImageURL',
    id: null,
  };

    componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.getImages(searchQuery, page);
    }
  }

    getImages = async (query, page) => {
      this.setState({ isLoading: true });
          if (!query) {
      return;
    }
      try {
      const { hits, totalHits } = await fetchImages(query, page);
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        loadMore: this.state.page < Math.ceil(totalHits / this.state.per_page),
      }));
    } catch (error) {
      this.setState({ error: 'Something went wrong', });
    } finally {
      this.setState({ isLoading: false });
    }
  };

    onFormSubmit = searchQuery => {
      this.setState({
      searchQuery,
      images: [],
      page: 1,
      loadMore: false,
    });
  };

    onloadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
    this.scrollOnMoreButton();
  };

    scrollOnMoreButton = () => {
    animateScroll.scrollToBottom({
      duration: 1000,
      delay: 10,
      smooth: 'linear',
    });
  };

  openModal = largeImageURL => {
    this.setState({
      showModal: true,
      largeImageURL: largeImageURL,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
    });
  };

  render() {
 const { isLoading, error, images, showModal, largeImageURL, loadMore, page} = this.state;
    return (
      <Container>

        <SearchBar onSubmit={this.onFormSubmit} />
          
        {error && <p>{error}</p>}
        
        {isLoading ? 
        (<Loader />) :
        (<ImageGallery images={images} openModal={this.openModal} />)}
          
        {loadMore && <Button onloadMore={this.onloadMore} page={page} />}

        {showModal && (<Modal largeImageURL={largeImageURL} onClose={this.closeModal} />)}
        
      </Container>
    );
  }
}