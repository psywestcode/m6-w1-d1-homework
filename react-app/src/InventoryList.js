import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './Navbar';
import { Link } from 'react-router-dom';

class InventoryList extends Component {

  constructor(props) {
    super(props);
    this.state = { inventories: [], isLoading: true };
    this.removeInventory = this.removeInventory.bind(this);
  }

 componentDidMount() {
    this.setState({ isLoading: true });

    // CHANGED: Added the leading slash '/' before api/inventory
    fetch('/api/inventory')
      .then(response => {
        // Optional: Add a quick check to see if the response is actually OK
        if (!response.ok) {
           throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => this.setState({ inventories: data, isLoading: false }))
      .catch(error => {
        console.error("Fetch error:", error);
        this.setState({ isLoading: false }); // Stop loading even if there's an error
      });
  }

  async removeInventory(id) {
    await fetch(`/api/inventory/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      // Remove the item from the local state to immediately update the UI
      let updatedInventories = [...this.state.inventories].filter(i => i._id !== id);
      this.setState({ inventories: updatedInventories });
    });
  }

  render() {
    const { inventories, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const inventoryList = inventories.map(inventory => {
      return (
        <tr key={inventory._id}>
          <td style={{whiteSpace: 'nowrap'}}>{inventory.prodname}</td>
          <td>{inventory.qty}</td>
          <td>{inventory.price}</td>
          <td>{inventory.status}</td>
          <td>
            <ButtonGroup>
              <Button size="sm" color="primary" tag={Link} to={"/inventories/" + inventory._id}>Edit</Button>
              <Button size="sm" color="danger" onClick={() => this.removeInventory(inventory._id)}>Delete</Button>
            </ButtonGroup>
          </td>
        </tr>
      );
    });

    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <div className="float-right mb-3">
            <Button color="success" tag={Link} to="/inventories/new">Add Inventory</Button>
          </div>
          <h3>Inventory List</h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="20%">Product Name</th>
                <th width="20%">Quantity</th>
                <th width="20%">Price</th>
                <th width="20%">Status</th>
                <th width="20%">Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventoryList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default InventoryList;