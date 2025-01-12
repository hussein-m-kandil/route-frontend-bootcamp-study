import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Modal from './Modal.jsx';

let lastFocusedCard = null;

function ImageCard(props) {
  const [hovered, setHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!modalOpen && lastFocusedCard) {
      lastFocusedCard.focus();
      lastFocusedCard = null;
    }
  }, [modalOpen]);

  const transitionStyle = { transition: 'opacity 0.5s ease-out' };

  const handleOpenModal = (e) => {
    lastFocusedCard = e.currentTarget;
    setModalOpen(true);
    setHovered(false);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className="col">
        <button
          type="button"
          style={{ cursor: 'pointer' }}
          className="btn btn-success p-0 border-0 overflow-hidden position-relative rounded-3"
          onClick={handleOpenModal}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
        >
          <img {...props} className={`img-fluid`} />
          <div
            className={`position-absolute top-0 start-0 w-100 h-100 bg-success`}
            style={{ ...transitionStyle, opacity: hovered ? '0.9' : '0' }}
          ></div>
          <div
            className="position-absolute top-50 start-50 translate-middle text-white"
            style={{
              fontSize: '6rem',
              ...transitionStyle,
              opacity: hovered ? '1' : '0',
            }}
          >
            <i className="fa-solid fa-plus"></i>
          </div>
        </button>
      </div>
      {modalOpen &&
        createPortal(
          <Modal onClose={handleCloseModal}>
            <img {...props} />
          </Modal>,
          document.body
        )}
    </>
  );
}

export default ImageCard;
