import React from 'react';

const product = (props) => {
  const image = require('../../images/' + props.product.imgName + '@2x.png');

  let overlay = <div className='overlay default'><p>Add to Cart</p></div>;
  switch (props.product.status) {
    case ('out_of_stock'):
      overlay = <div className='overlay'><p>Out of Stock</p></div>;
      break;
    default:
      break;
  }

  return (
    <div className='product' onClick={() => props.selectProduct(props.product.id)}>
      <img src={image} alt={props.product.title}/>
      <p>{props.product.title}</p>
      {overlay}
    </div>)
}

export default product;
