import React from 'react';

const Header = () => {
  const username = localStorage.getItem('username') || 'User';

  return (
    <header className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-sm z-50 px-4 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold text-white bg-gradient-to-r from-white to-gray-300 bg-clip-text">
          FEMINAE
        </h1>
        <div className="text-white text-sm md:text-base">
          Hello, <span className="font-semibold">{username}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;

