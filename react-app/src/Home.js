import React, { Component } from 'react';
import './App.css';
import AppNavbar from './Navbar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

class Home extends Component {
  render() {
    return (
      <div>
        <AppNavbar />
        <Container fluid>
          {/* Navigates to the /inventories route */}
          <Button color="link"><Link to="/inventories">Manage Inventory List</Link></Button>
        </Container>
      </div>
    );
  }
}

export default Home;