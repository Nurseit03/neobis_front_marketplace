import React from 'react';
import heart from '../../img/heart.png';

const ProductCard = ({ image, name, price }) => {
  return (
    <div className="product__card">
      <img src={image} alt="Product" className="product__card__image"/>
      <p className="product__card__name">{name}</p>
      <p className="product__card__price">4242</p>
      <div className="product__card__likes">
          <img src={heart} alt="#"/>
          <p>100</p>
      </div>
    </div>
  );
}

export default ProductCard;
