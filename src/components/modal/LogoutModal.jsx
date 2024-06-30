import React from 'react';

const LogoutModal = ({ isOpen, onClose, isLogout }) => {
  if (!isOpen) return null; // Render nothing if isOpen is false

  return (
    <div className="fixed inset-0 z-[9999]flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-card w-full max-w-md p-6 rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-lg font-bold text-primary mb-2">Logout</h2>
          <p className="text-sm text-muted-foreground">Are you sure you want to logout?</p>
        </div>
        <div className="flex justify-center mt-6 space-x-4">
          <button
            className="bg-destructive text-destructive-foreground hover:bg-destructive/80 px-4 py-2 rounded-md"
            onClick={isLogout}
          >
            Logout
          </button>
          <button
            className="bg-secondary text-secondary-foreground hover:bg-secondary/80 px-4 py-2 rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
