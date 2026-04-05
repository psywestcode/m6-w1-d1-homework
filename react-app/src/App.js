import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InventoryList from './InventoryList';
import InventoryEdit from './InventoryEdit';

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          {/* CHANGED: Use element={<Component />} instead of component={Component} for React Router v6 */}
          <Route path='/' element={<Home />} />
          <Route path='/inventories' element={<InventoryList />} />
          <Route path='/inventories/:id' element={<InventoryEdit />} />
        </Routes>
      </Router>
    )
  }
}

export default App;