import React from 'react';

import './App.css';
import KanbanBoard from './components/KanbanBoard/KanbanBoard';

function App() {
  return (
    <div className="App">
      <h1>Github Kanban Board</h1>
      <KanbanBoard />
    </div>
  );
}

export default App;
