import React, { Component } from "react";
import "./App.css";
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form';


class App extends Component {
  state = {
    items: [],
    productName: "",
    productPrice: "",
    quantity: 1,
  };

  handleProductNameChange = (e) => {
    this.setState({ productName: e.target.value });
  };

  handleProductPriceChange = (e) => {
    this.setState({ productPrice: e.target.value });
  };

  handleQuantityChange = (e) => {
    this.setState({ quantity: e.target.value });
  };

  handleAddItem = () => {
    const { productName, productPrice, quantity } = this.state;

    if (!productName || !productPrice) {
      alert("Please fill in both product name and product price.");
      return;
    }

    const newItem = {
      productName,
      productPrice: parseFloat(productPrice),
      quantity: parseInt(quantity),
    };

    this.setState((prevState) => ({
      items: [...prevState.items, newItem],
      productName: "",
      productPrice: "",
      quantity: 1,
    }));
  };

  handleDeleteItem = (index) => {
    this.setState((prevState) => ({
      items: prevState.items.filter((_, i) => i !== index),
    }));
  };

  render() {
    const { items, productName, productPrice, quantity } = this.state;

    const total = items.reduce(
      (acc, item) => acc + item.productPrice * item.quantity,
      0
    );

    return (
      <Container>
        <h1>Code Test</h1>
        <button onClick={this.handleAddItem}>New</button>

        <div>
          <input
            type="text"
            placeholder="Product Name"
            value={productName}
            onChange={this.handleProductNameChange}
          />
          <input
            type="number"
            placeholder="Product Price"
            value={productPrice}
            onChange={this.handleProductPriceChange}
          />
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={this.handleQuantityChange}
            min="1"
          />
        </div>
        <div>
          {items.map((item, index) => (
            <div key={index} className="item">
              <div>{item.productName}</div>
              <div>{item.productPrice}</div>
              <div>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => this.handleQuantityChange(e, index)}
                  min="1"
                />
              </div>
              <div>{item.productPrice * item.quantity}</div>
              <button onClick={() => this.handleDeleteItem(index)}>
                Delete
              </button>
            </div>
          ))}
        </div>
        <div>
          <h3>Grand total: {total}</h3>
        </div>
      </Container>
    );
  }
}

export default App;
