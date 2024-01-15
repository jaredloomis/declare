import React from 'react';

interface ModalProps {
  children?: React.ReactNode;
  onClose?: () => void;
}

export function Modal({ children }: ModalProps) {
  return (
    <div>
      MODAL:
      {children}
    </div>
  );
}
