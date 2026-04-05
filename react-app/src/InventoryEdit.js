import React, { Component } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom'; // <-- MUST HAVE THESE
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './Navbar';

class InventoryEdit extends Component {
  emptyInventory = {
    prodname: '',
    qty: '',
    price: '',
    status: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyInventory
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    // CHANGED: Use this.props.params instead of this.props.match.params
    if (this.props.params.id !== 'new') {
      const inventory = await (await fetch(`/api/inventory/${this.props.params.id}`)).json();
      this.setState({ item: inventory });
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = { ...this.state.item };
    item[name] = value;
    this.setState({ item });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { item } = this.state;

    await fetch('/api/inventory', {
      method: (item._id) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    }); // <-- Make sure you have this closing bracket and parenthesis!
    
    // CHANGED: Use this.props.navigate instead of this.props.history.push
    this.props.navigate('/inventories');
  }

  render() {
    const { item } = this.state;
    const title = <h2>{item._id ? 'Edit Inventory' : 'Add Inventory'}</h2>;

    return (
      <div>
        <AppNavbar />
        <Container>
          {title}
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="prodname">Product Name</Label>
              <Input type="text" name="prodname" id="prodname" value={item.prodname || ''}
                     onChange={this.handleChange} autoComplete="prodname" />
            </FormGroup>
            <FormGroup>
              <Label for="qty">Quantity</Label>
              <Input type="text" name="qty" id="qty" value={item.qty || ''}
                     onChange={this.handleChange} autoComplete="qty" />
            </FormGroup>
            <FormGroup>
              <Label for="price">Price</Label>
              <Input type="text" name="price" id="price" value={item.price || ''}
                     onChange={this.handleChange} autoComplete="price" />
            </FormGroup>
            <FormGroup>
              <Label for="status">Status</Label>
              <Input type="text" name="status" id="status" value={item.status || ''}
                     onChange={this.handleChange} autoComplete="status" />
            </FormGroup>
            <FormGroup>
              <Button color="primary" type="submit">Save</Button>{' '}
              <Button color="secondary" tag={Link} to="/inventories">Cancel</Button>
            </FormGroup>
          </Form>
        </Container>
      </div>
    );
  }
}


// This function extracts the hooks from React Router v6 and passes them 
// down as props to the Class Component to resolve the 'undefined' error.
function InventoryEditWrapper(props) {
  const params = useParams();
  const navigate = useNavigate();

  return <InventoryEdit {...props} params={params} navigate={navigate} />;
}

// Export the wrapper instead of the class
export default InventoryEditWrapper;