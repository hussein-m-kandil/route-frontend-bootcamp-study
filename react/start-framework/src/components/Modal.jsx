import { useEffect, useRef } from 'react';

function Modal({ children, onClose }) {
  const closeBtnRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const modal = modalRef.current;
    if (modal) {
      // Add show class
      const id = setTimeout(() => {
        if (modal) modal.classList.add('show');
      }, 0);
      // Trap the focus
      modal.focus();
      const trapFocus = (e) => {
        if (!modal.contains(e.target)) {
          e.preventDefault();
          modal.focus();
        }
      };
      document.addEventListener('focusin', trapFocus);
      // Close on Escape button pressed
      const closeOnEscape = (e) => {
        if (e.key === 'Escape') {
          const closeBtn = closeBtnRef.current;
          if (closeBtn) closeBtn.click();
        }
      };
      document.addEventListener('keydown', closeOnEscape);
      // Hide body overflow
      const overflowHidden =
        document.body.classList.contains('overflow-hidden');
      if (!overflowHidden) document.body.classList.add('overflow-hidden');
      // Clean
      return () => {
        clearTimeout(id);
        document.removeEventListener('focusin', trapFocus);
        document.removeEventListener('keydown', closeOnEscape);
        if (!overflowHidden) {
          document.body.classList.remove('overflow-hidden');
          if (!document.body.className) document.body.removeAttribute('class');
        }
      };
    }
  }, []);

  const handleCloseModal = (e) => {
    if (e.target === e.currentTarget) {
      const modal = modalRef.current;
      if (modal) modal.classList.remove('show');
      setTimeout(() => onClose(e), 250);
    }
  };

  return (
    <>
      <div
        ref={modalRef}
        className="modal fade bg-primary bg-opacity-75"
        id="exampleModal"
        tabIndex="-1"
        aria-modal="true"
        role="dialog"
        style={{ display: 'block' }}
        onClick={handleCloseModal}
      >
        <button
          autoFocus
          type="button"
          ref={closeBtnRef}
          className="btn-close"
          aria-label="Close"
          style={{
            position: 'absolute',
            top: '2rem',
            right: '2rem',
            filter: 'invert()',
          }}
          onClick={handleCloseModal}
        ></button>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">{children}</div>
        </div>
      </div>
    </>
  );
}

export default Modal;
