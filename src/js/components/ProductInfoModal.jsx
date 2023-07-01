import React, { useState, useEffect }from 'react';
import ReactModal from 'react-modal';
import axios from '../api/axios';
import close from '../../img/close.png';
import heart from '../../img/heart.png';
import bmw from '../../img/bmw.png';
import '../../css/components/ProductInfoModal.css';

const ProductInfoModal = ({ isOpen, onClose,product_id, isEditMode }) => {
    const [productData, setProductData] = useState(null);

    useEffect(() => {
        const handleOpenCard = async () => {
          try {
            const accessToken = localStorage.getItem('access-token');
            const response = await axios.get(`/products/${product_id}/`, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
    
            console.log('Successful open card:', response);
            console.log('Card data:', response.data);
            console.log('Card likes username:', response.data.likes);
            setProductData(response.data);
          } catch (error) {
            console.log('Open card error:', error);
          }
        };
    
        if (isOpen) {
          handleOpenCard();
        }
    }, [isOpen, product_id]);

  return (
    <ReactModal
      isOpen={isOpen}
      contentLabel="Product info"
      className="modal__content info"
      overlayClassName="modal__overlay"
    >
      <div className="product__info__header">
        <button className="modal__close__button" onClick={onClose}>
          <img src={close} alt="Close" />
        </button>
      </div>
      <div className="product__info__body">
        <img src={bmw} alt="Product" className="product__info__image"/>
        <h1 className="product__info__price">
            {productData ? `${productData.price} $` : ''}
        </h1>
        <div className="product__card__likes">
          <button className="product__card__heart__button">
            <img src={heart} alt="#"/>
          </button>
          <h5>Нравится: {productData ? `${productData.like_count} ` : '0'}</h5>
        </div>
        <div className="product__card__description">
              <h3 className="product__card__description__name">{productData ? `${productData.name} ` : ''}</h3>
              <p className="product__card__description__description">{productData ? `${productData.description} ` : ''}</p>
        </div>
      </div>
    </ReactModal>
  );
};

export default ProductInfoModal;
