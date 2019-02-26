import React, { Component } from 'react';

import Todo from './Todo';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="app-header">
          <p>
            ToDo react app
          </p>
        </header>
        <main className="app-main">
          <Todo />
        </main>
      </div>
    );
  }
}

export default App;
