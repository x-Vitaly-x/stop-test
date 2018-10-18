import React, { Component } from 'react';
import './App.css';
import HeaderLogo from './HeaderLogo';
import Products from './Products/Products';
import CartItems from './CartItems/CartItems';
import fetch from './api/mock';

class App extends Component {
  state = {
    products: [],
    cartItems: []
  }

  componentDidMount () {
    this.fetchProducts();
  }

  fetchProducts () {
    fetch('https://example.com/-/v1/stock', {
      method: 'GET'
    }).then(res => {
      this.setState({ products: res.json() });
    });
  }

  selectProduct (productId) {
    fetch('https://example.com/-/v1/stock/reserve', {
      method: 'POST'
    }).then(responseData => {
      this.handleProductResponse(productId, responseData);
    }).catch(err => {
      console.log('Other error:', err)
    });
  }

  // three options, two of them block the product
  handleProductResponse (productId, responseData) {
    switch (responseData.status) {
      case(204): // everything OK, booked
        this.buyProduct(productId, responseData.json());
        break;
      case(418): // out of stock, can't book
        alert('Unfortunately we are out of stock, therefore purchasing this item is no longer possible.')
        this.setProductStatus(productId, 'out_of_stock');
        break;
      case(500): // error, do nothing, but display alert
        alert('Could not book item, try again later.');
        break;
      default:
        break;
    }
  }

  // buy product
  // if product with id in cart, increase amount by one, otherwise put it in collection
  buyProduct (productId, options) {
    const cartItems = [...this.state.cartItems]; // spread array, creating a new object
    let productIndex = this.state.products.findIndex(el => {
      return el.id === productId;
    });
    // only buy available products
    if (this.state.products[productIndex].status !== 'available') {
      return;
    }

    let boughtItemIndex = cartItems.findIndex(el => {
      return el.id === productId;
    });

    if (boughtItemIndex === -1) {
      // init new product from product collection
      const product = this.state.products[productIndex];
      product['amount'] = 1;
      cartItems.push(product);
    } else {
      const product = {
        ...cartItems[boughtItemIndex] // distribute all the properties of the object, thus creating a new object
      };
      product['amount'] = product['amount'] + 1;
      cartItems[boughtItemIndex] = product;
    }

    this.setState({ cartItems });
  }

  setProductStatus (productId, status) {
    let products = this.state.products;
    let productIndex = products.findIndex(el => {
      return el.id === productId;
    });

    const product = {
      ...this.state.products[productIndex]
    };

    product['status'] = status;
    products[productIndex] = product;
    this.setState({ products });
  }

  render () {
    return (
      <div className="App">
        <HeaderLogo/>
        <Products products={this.state.products} selectProduct={this.selectProduct.bind(this)}/>
        <CartItems cartItems={this.state.cartItems}/>
      </div>
    );
  }
}

export default App;
