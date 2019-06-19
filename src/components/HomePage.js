import React from 'react';

import List from './List';

function App() {
  return (
    <div>
    <main className='container'>
      <List 
      collection='comments'
      noList='There are no comments yet. You can be the first commenter!'
      loadingMessage='Loading Comments'
      />
      </main>
    </div>
  );
}

export default App;
