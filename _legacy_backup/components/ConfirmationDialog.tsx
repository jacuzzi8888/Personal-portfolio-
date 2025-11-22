import React from 'react';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
    >
      <div
        className="bg-[var(--card-bg-color)] rounded-lg shadow-2xl w-full max-w-md border border-gray-300"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6">
          <h3 id="dialog-title" className="text-lg font-bold text-[var(--secondary-text)]">{title}</h3>
          <p className="mt-2 text-sm text-gray-600">{message}</p>
        </div>
        <div className="bg-gray-50 px-6 py-3 flex justify-end items-center space-x-3 rounded-b-lg">
          <button
            onClick={onClose}
            className="bg-gray-200 text-[var(--primary-text)] font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors text-sm border border-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-[var(--primary-accent)] text-white font-bold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity text-sm"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;