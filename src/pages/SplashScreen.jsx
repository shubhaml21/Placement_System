import React from 'react';
import Logo_placement from '../Assets/Logo_placement.png';

const SplashScreen = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center">
        <img src={Logo_placement} 
         alt="Logo" className="h-60 w-76 mb-4 scale-in-center"  />
       
      </div>
    </div>
  );
};

export default SplashScreen;
