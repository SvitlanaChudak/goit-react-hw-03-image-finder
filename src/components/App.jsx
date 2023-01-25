
import React, { Component } from "react";
import { fetchImages } from "services/api";
import { SearchBar } from "./Searchbar/SearchBar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Modal } from "./Modal/Modal";
import { Loader } from './Loader/Loader';
import { animateScroll } from 'react-scroll';


export class App extends Component {
  state = {
    images: [],
    searchQuery: '',
    page: 1,
    isLoading: false,
    error: null,
    showModal: false,
    largeImageURL: 'largeImageURL',
    loadMore: false,
  };

    getImages = async (query, page) => {
      this.setState({ isLoading: true });
          if (!query) {
      return;
    }
      try {
      const { hits, totalHits } = await fetchImages(query, page);
      console.log(hits, totalHits);
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

  componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.getImages(searchQuery, page);
    }
  }

    onFormSubmit = searchQuery => {
      this.setState({
      searchQuery,
      images: [],
      page: 1,

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
    console.log(largeImageURL);
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
      <div>
        
          <SearchBar onSubmit={this.onFormSubmit} />
          
       {error && <p>{error}</p>}
        {isLoading && <p>Loading...</p>}
        
           {isLoading ? (
          <Loader />
        ) : (
          <ImageGallery images={images} openModal={this.openModal} />
        )}
          
       {loadMore && <Button onloadMore={this.onloadMore} page={page} />}
        {showModal && <Modal largeImageURL={largeImageURL} onClose={this.closeModal} />}
      </div>
    );
  }
}