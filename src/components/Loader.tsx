import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="loader-container">
      <div className="custom-spinner"></div>
      <h2>Loading...</h2>
    </div>
  );
};

export default Loader;
