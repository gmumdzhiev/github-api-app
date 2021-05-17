
// Standart usage
import React, { useState } from 'react';

// Importing own components
import RepoList from './components/RepoList';
import User from './components/User';


function App() {

  // Initial state value that can be used globally
  const [clickedValue, setClickedValue] = useState("")

  // A function that its value is recieved from a child
  function handleClick(newValue) {
    setClickedValue(newValue)
  }

  // RENDER 
  return (

    <div className="App">
      <header>
        <h1>GitHub API Public repositories</h1>
      </header>
      <div className="content">
        
        <RepoList
          // Passing the handleCLick to the child so that
          // its value can be updated and sended back
          onClick={handleClick}
          // Passing the clickedValue state as a prop to the child
          clickedValue={clickedValue}
        />

        <User
          // Passing the clickedValue state as a prop to the child
          clickedValue={clickedValue} />
          
      </div>
    </div>

  );
}

export default App;


