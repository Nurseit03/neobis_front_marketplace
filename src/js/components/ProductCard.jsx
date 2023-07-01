import React, {useState, useEffect} from 'react';
import heart from '../../img/heart.png';
import grey_heart from '../../img/grey_heart.png';
import axios from '../api/axios';
import bmw from '../../img/bmw.png';
import more from '../../img/more-vertical.png';
import ProductInfoModal from '../components/ProductInfoModal';
import ProductMoreModal from '../components/ProductMoreModal';

const ProductCard = ({product_id, like_count, name, price, photo, description, owner, likes, isMyAddedProductsPage }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [productId, setProductId] = useState();
  const [isLikedByUser, setIsLikedByUser] = useState(false);

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
        window.location.reload();
      } catch (error) {
        console.error("Like error:",error);
      }
    };
  const handleOpenSecondModal = () =>{
    setIsSecondModalOpen(true);
  }
  const handleOpenCard = () => {
      try {
        setIsModalOpen(true);
        setProductId(product_id);
      } 
      catch (error){
         console.log("Open card error:",error)
      }
  }

  useEffect(() => {
        const handleCheckLike = async () => {
          try {
            const accessToken = localStorage.getItem('access-token');
            const response = await axios.get(`/products/${product_id}/`, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });

            const likedUsernames = response.data.likes.map(like => like.username);
            const userData = localStorage.getItem("SignupData") ? JSON.parse(localStorage.getItem("SignupData")) : null;
            const username = userData ? userData.username : null;
            const isLikedByUser = likedUsernames.includes(username);

            setIsLikedByUser(isLikedByUser);
          } catch (error) {
            console.log('Open handleCheckLike error:', error);
          }
        };
    
        handleCheckLike();
    }, [product_id]);

  return (
    <div className="product__card">
      <button className="product__card__heart__button" onClick={handleOpenCard}>
        <img src={bmw} alt="Product" className="product__card__image"/>
      </button>
      <b className="product__card__name">{name}</b>
      <p className="product__card__price">{price} $</p>
      <div className="product__card__likes">
          <div className="product__card__likes">
          <button className="product__card__heart__button" onClick={handleLike}>
          <img src={isLikedByUser ? heart : grey_heart} alt="#" />
          </button>
          <p>{like_count}</p>
          </div>
          {isMyAddedProductsPage && (
          <button className="product__card__more" onClick={handleOpenSecondModal}>
            <img src={more} alt=":" />
          </button>
          )}
          {isSecondModalOpen && (
            <ProductMoreModal
              isOpen={isSecondModalOpen}
              onClose={() => setIsSecondModalOpen(false)} 
              product_id={product_id}
            />
          )}
      </div>
      {/* Модальное окно с подробной информацией  */}
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
