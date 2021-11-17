import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.scss';
// import { Component } from 'react';

export function Modal({ children, toggleModal }) {
  useEffect(() => {
    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  });
  const handleEscape = e => {
    let condition = e.code === 'Escape';
    console.log(condition);
    if (condition) {
      toggleModal();
    }
  };
  const handleClose = e => {
    if (e.currentTarget === e.target) {
      toggleModal();
    }
  };
  return createPortal(
    <div className={s.backDrop} onClick={handleClose}>
      <div className={s.content}>{children}</div>
    </div>,
    document.getElementById('modalRoot'),
  );
}

// export class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleEscape);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleEscape);
//   }

//   handleEscape = e => {
//     let condition = e.code === 'Escape';
//     console.log(condition);
//     if (condition) {
//       this.props.toggleModal();
//     }
//   };
//   handleClose = e => {
//     if (e.currentTarget === e.target) {
//       this.props.toggleModal();
//     }
//   };
//   render() {
//     const { children } = this.props;
//     return createPortal(
//       <div className={s.backDrop} onClick={this.handleClose}>
//         <div className={s.content}>{children}</div>
//       </div>,
//       document.getElementById('modalRoot'),
//     );
//   }
// }
