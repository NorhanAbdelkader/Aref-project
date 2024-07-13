import React from 'react';
import './confirmationDialog.css';

const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="confirmation-dialog">
      <div className="confirmation-dialog-content">
        <p>{message}</p>
        <div className="confirmation-dialog-buttons">
          <button onClick={onConfirm} className="confirm-button">تأكيد</button>
          <button onClick={onCancel} className="cancel-button">إلغاء</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;