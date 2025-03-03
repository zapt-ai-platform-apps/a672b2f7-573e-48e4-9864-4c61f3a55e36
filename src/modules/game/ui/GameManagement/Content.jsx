import React from 'react';
import Main from './Main.jsx';

function Content(props) {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <Main {...props} />
    </div>
  );
}

export default Content;