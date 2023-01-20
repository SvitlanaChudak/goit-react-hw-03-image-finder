// import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";

export const ImageGallery = ({ items }) => (
  <ul>
    {items.map(({id, webformatURL, largeImageURL}) => {
      return (
          <li key={id}>
    <img src={webformatURL} alt={largeImageURL} />
  </li>
      )
    })}
    </ul>
);