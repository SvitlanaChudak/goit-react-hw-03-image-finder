import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import PropTypes from 'prop-types';

export const ImageGallery = ({ images, openModal }) => (
  <ul>
    {images.map(({id, webformatURL, largeImageURL, tags}) => (
        <ImageGalleryItem key={id} src={webformatURL} alt={tags} largeImageURL={largeImageURL} openModal={openModal}/>
    ))}
    </ul>
);

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })),
  openModal: PropTypes.func.isRequired,
};