import React, { Component } from 'react';
import cart from '../images/cart.svg';
import './CartItems.css';

class CartItems extends Component {
  state = {
    display: false
  }

  render () {
    const total = this.props.cartItems.map(item => item.amount).reduce((a, b) => a + b, 0);
    return (
      <div className='cart-items'>
        <div className='button'>
          <img src={cart} alt='cart'/>
          <div className='indicator'>{total}</div>
        </div>
        <div className='list'>
          {this.props.cartItems.map((item, index) => {
            return (
              <div className='item' key={index}>
                <span className='title'>{item.title}</span>
                <span className='amount'>x{item.amount}</span>
              </div>)
          })}
        </div>
      </div>
    );
  }
}

export default CartItems;
