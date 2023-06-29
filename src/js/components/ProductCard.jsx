import React, {useState} from 'react';
import heart from '../../img/heart.png';
import axios from '../api/axios';
import bmw from '../../img/bmw.png'

const ProductCard = ({product_id, like_count, name, price, photo, description, owner, likes }) => {
    const [productLike, setProductLike] = useState('');
    const handleLike = async () => {
      try {
        const accessToken = localStorage.getItem('access-token');
        const response = await axios.post(
          `/products/${product_id}/like/`, product_id.toString(),
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        ); 

        setProductLike(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    
    const handleOpenCard = () => {
        alert("open");
    }

  return (
    <div className="product__card">
      <button className="product__card__heart__button" onClick={handleOpenCard}>
        <img src={bmw} alt="Product" className="product__card__image"/>
      </button>
      <b className="product__card__name">{name}</b>
      <p className="product__card__price">{price} $</p>
      <div className="product__card__likes">
          <button className="product__card__heart__button" onClick={handleLike}>
            <img src={heart} alt="#"/>
          </button>
          <p>{like_count}</p>
      </div>
    </div>
  );
}

export default ProductCard;
