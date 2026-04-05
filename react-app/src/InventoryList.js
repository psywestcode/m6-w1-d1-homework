import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './Navbar';
import { Link } from 'react-router-dom';

class InventoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inventories: [],
      isLoading: true
    };
    this.removeInventory = this.removeInventory.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch('http://localhost:8080/api/inventories')
      .then(response => response.json())
      .then(data => this.setState({ inventories: data, isLoading: false }))
      .catch(error => {
        console.error('Error loading inventories:', error);
        this.setState({ isLoading: false });
      });
  }

  async removeInventory(id) {
    await fetch(`http://localhost:8080/api/inventory/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });

    const updatedInventories = [...this.state.inventories].filter(i => i._id !== id);
    this.setState({ inventories: updatedInventories });
  }

  render() {
    const { inventories, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const inventoryList = inventories.map(inventory => (
      <tr key={inventory._id}>
        <td>{inventory.prodname}</td>
        <td>{inventory.qty}</td>
        <td>{inventory.price}</td>
        <td>{inventory.status}</td>
        <td>
          <ButtonGroup>
            <Button
              size="sm"
              color="primary"
              tag={Link}
              to={`/inventories/${inventory._id}`}
            >
              Edit
            </Button>
            <Button
              size="sm"
              color="danger"
              onClick={() => this.removeInventory(inventory._id)}
            >
              Delete
            </Button>
          </ButtonGroup>
        </td>
      </tr>
    ));

    return (
      <div>
        <AppNavbar />
        <Container fluid>
          <div className="float-end">
            <Button color="success" className="my-4" tag={Link} to="/inventories/new">
              Add Inventory
            </Button>
          </div>
          <h3>Inventory List</h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{inventoryList}</tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default InventoryList;