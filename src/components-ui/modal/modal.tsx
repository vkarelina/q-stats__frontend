import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

import Close from '../../assets/icons/close.svg';

import styles from './modal.module.css';

interface ModalProps {
  children: ReactNode;
  setIsOpen: (isOpen: boolean) => void;
}

const Modal = ({ children, setIsOpen }: ModalProps) => {
  const modalRoot = document.body;

  const onClose = () => setIsOpen(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return createPortal(
    <div className={styles.wrapperModal}>
      <div className={styles.bodyModal}>
        { children }
        <button className={styles.wrapperIconCloseModal}>
          <Close onClick={onClose} />
        </button>
      </div>
    </div>,
    modalRoot,
  );
};

export default Modal;
