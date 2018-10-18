import React, { PureComponent } from 'react';
import Product from './Product/Product';
import './Products.css';

class Products extends PureComponent {

  render () {
    return (
      <div className='products'>
        {this.props.products.map((product, index) => {
          return <Product
            key={product.id}
            selectProduct={this.props.selectProduct}
            product={product}/>
        })}
      </div>)
  }
}

export default Products;
