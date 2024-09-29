import React from 'react';
import './ProductList.css'; 
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { addItemToCart } from './CartSlice';

const ProductList = () => {

  const dispatch = useDispatch();
  //const [disabledProducts, setDisabledProducts] = useState([]); // State to store disabled products
  
  const products = [
    { id: 1, name: 'Product A', price: 60 },
    { id: 2, name: 'Product B', price: 75 },
    { id: 3, name: 'Product C', price: 30 },
  ];

  const handleAddToCart = product => {
    dispatch(addItemToCart(product));
    //setDisabledProducts([...disabledProducts, product.id]); // Mark the product as disabled
  };

  //Use redux to determine if the item is in the cart.
  const cartItems = useSelector(state => state.cart.cartItems);
  const existingItem = productId => {
    return cartItems.find(item => item.id === productId);
  }
  
  return (
    <div className="product-list">
      <h2 className="product-list-title">Products</h2>
      <ul className="product-list-items">
        {products.map(product => (
            <li key={product.id} className="product-list-item">
            <span>{product.name} - ${product.price}</span>
            <button
                className={`add-to-cart-btn${existingItem(product.id) ? '-disabled' : ''}`}
                onClick={() => handleAddToCart(product)}
                disabled={existingItem(product.id)} // Disable button if product is in the cart
                >
                Add to Cart
            </button>
            </li>
            ))}
      </ul>
    </div>
  );
};

export default ProductList;
