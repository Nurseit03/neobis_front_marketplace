import React, {useState} from 'react';
import heart from '../../img/heart.png';
import axios from '../api/axios';
import bmw from '../../img/bmw.png'
import ProductInfoModal from '../components/ProductInfoModal';

const ProductCard = ({product_id, like_count, name, price, photo, description, owner, likes }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productId, setProductId] = useState();

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

        const SignupData = localStorage.getItem("SignupData");
        const username = SignupData.username;
        
        const response2 = await axios.post(
          '/favorites/',
          {
            username: username, 
            product: product_id,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        ); 

        console.log("Successfull like:",response);
        console.log("Successful favorites:",response2);
      } catch (error) {
        console.error("Like error:",error);
      }
    };
    
  const handleOpenCard = async() => {
      try {
        setIsModalOpen(true);
        setProductId(product_id);
      } 
      catch (error){
         console.log("Open card error:",error)
      }
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
      {isModalOpen && (
        <ProductInfoModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)} 
          handleOpenCard={handleOpenCard}
          product_id={productId}
        />
      )}
    </div>
  );
}

export default ProductCard;
