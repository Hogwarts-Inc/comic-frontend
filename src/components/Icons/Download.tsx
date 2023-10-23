import React from 'react';

/* eslint-disable max-len */
function Download({ size }: { size: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 0 24 24">
      <path
        d="M12.0241 17.25C12.3197 17.2505 12.6125 17.1926 12.8856 17.0796C13.1587 16.9666 13.4068 16.8007 13.6156 16.5915L16.5549 13.65L15.4944 12.5925L12.7696 15.318L12.7501 3H11.2501L11.2696 15.306L8.55464 12.591L7.49414 13.65L10.4334 16.5892C10.642 16.7987 10.8899 16.9649 11.1628 17.0783C11.4358 17.1917 11.7285 17.2501 12.0241 17.25V17.25Z"
        fill="currentColor"
      />
      <path
        d="M19.5 15V18.75C19.5 18.9489 19.421 19.1397 19.2803 19.2803C19.1397 19.421 18.9489 19.5 18.75 19.5H5.25C5.05109 19.5 4.86032 19.421 4.71967 19.2803C4.57902 19.1397 4.5 18.9489 4.5 18.75V15H3V18.75C3 19.3467 3.23705 19.919 3.65901 20.341C4.08097 20.7629 4.65326 21 5.25 21H18.75C19.3467 21 19.919 20.7629 20.341 20.341C20.7629 19.919 21 19.3467 21 18.75V15H19.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default Download;
