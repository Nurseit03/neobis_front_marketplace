import React, {useState} from 'react';
import heart from '../../img/heart.png';
import axios from '../api/axios';

const ProductCard = ({ image, name, price, likes, product_id }) => {
    const [like,setLike] = useState(0);
    const handleLike = () => {
        axios.post(`/products/${product_id}/like/`)
        .then(response => {
          setLike(response.data.likes);
        })
        .catch(error => {
          console.error(error);
        });
    }
    const handleOpenCard = () => {
        alert("open");
    }

  return (
    <div className="product__card">
      <button className="product__card__heart__button" onClick={handleOpenCard}>
        <img src={image} alt="Product" className="product__card__image"/>
      </button>
      <p className="product__card__name">{name}</p>
      <p className="product__card__price">{price}</p>
      <div className="product__card__likes">
          <button className="product__card__heart__button" onClick={handleLike}>
            <img src={heart} alt="#"/>
          </button>
          <p>{like}</p>
      </div>
    </div>
  );
}

export default ProductCard;
