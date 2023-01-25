import { Component } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackDropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className="Overlay" onClick={this.handleBackDropClick}>
        <div className="Modal">
          <img src={this.props.largeImageURL} alt="" />
        </div>
      </div>,
      modalRoot
    );
  }
}





// import React, { Component } from 'react';
// import { createPortal } from 'react-dom';

// const modalRoot = document.querySelector('#modal-root');

// export class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.keydown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.keydown);
//   }

//   keydown = event => {
//     if (event.code === 'Escape') {
//       this.props.toggleModal();
//     }
//   };

//   clickOut = event => {
//     if (event.target === event.currentTarget) {
//       this.props.toggleModal();
//     }
//   };

//   render() {
// return createPortal(
//     <div class="overlay" onClick={this.clickOut}>
//       <div class="modal">
//         <img src="{this.props.url}" alt="" />
//       </div>
//   </div>,
//   modalRoot
// )
//   }
// }