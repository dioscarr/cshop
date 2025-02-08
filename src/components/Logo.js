import React from 'react';

const Logo = () => (
  <svg
    width="150"
    height="50"
    viewBox="0 0 150 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Scissors Icon */}
    <circle cx="15" cy="15" r="10" stroke="#1D4ED8" strokeWidth="2" />
    <circle cx="35" cy="15" r="10" stroke="#1D4ED8" strokeWidth="2" />
    <line x1="15" y1="15" x2="35" y2="15" stroke="#1D4ED8" strokeWidth="2" />
    <line x1="15" y1="15" x2="15" y2="35" stroke="#1D4ED8" strokeWidth="2" />
    {/* Branding Text */}
    <text
      x="50"
      y="30"
      fill="#1D4ED8"
      fontSize="20"
      fontFamily="Arial, sans-serif"
    >
      BookCut
    </text>
  </svg>
);

export default Logo;
