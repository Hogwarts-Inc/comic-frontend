import React from 'react';

/* eslint-disable max-len */
function Pixabay({ size }: { size: number }) {
  return (
    <svg height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        fill="currentColor"
        d="m2.507 15.86v5.116c-.818.038-1.636.029-2.454-.019-.019-.25-.048-.461-.048-.662 0-3.6-.01-7.19 0-10.79.01-2.899 1.723-5.337 4.322-6.192 3.86-1.277 7.758 1.507 8.114 5.414.27 2.937-1.28 5.548-3.86 6.652-.828.355-1.694.47-2.58.47-1.136.011-2.253.011-3.494.011zm.009-2.582c1.261 0 2.435-.019 3.609 0 2.089.038 3.581-1.517 3.84-3.36.289-2.112-1.194-4.051-3.301-4.348h-.01c-1.962-.26-3.945 1.257-4.109 3.282-.125 1.44-.029 2.88-.029 4.426z"
      />
      <path
        fill="currentColor"
        d="m19.332 9.217 4.668 6.547h-3.022l-3.465-4.732c-1.261 1.565-2.31 3.187-3.504 4.732h-3.013l4.659-6.547-4.148-6.201h3.022l2.965 4.416 2.965-4.416h3.013z"
      />
    </svg>
  );
}

export default Pixabay;
