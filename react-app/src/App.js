import React from 'react';
import Home from './Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InventoryList from './InventoryList';
import InventoryEdit from './InventoryEdit';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inventories" element={<InventoryList />} />
        <Route path="/inventories/:id" element={<InventoryEdit />} />
      </Routes>
    </Router>
  );
}

export default App;