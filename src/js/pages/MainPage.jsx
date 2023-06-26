import React, { useState, useEffect } from 'react';
import axios from '../api/axios.js';
import  logo from '../../img/main_page_icon.png';
import profile_icon from '../../img/profile_icon.png'
import { Link } from 'react-router-dom';
import '../../css/pages/MainPage.css';
import AddProductModal from '../components/AddProductModal';
import UserInfo from '../components/UserInfo';
import ProductCard from '../components/ProductCard'

const MainPage = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('/photos')
          .then(response => {
            setProducts(response.data);
          })
          .catch(error => {
            console.error(error);
          });
    }, []);

    const handleOpenModal = () => {
        setModalOpen(true);
    };
    
    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <>
        <div className="main_page__container">
            <div className="main_page__header">
                <img src={logo} alt="#"/>
                <div className="header__control">
                    <button className="button__upload" onClick={handleOpenModal}>Подать обьявление</button>
                    <UserInfo />
                </div>
            </div>
            <div className="all_items">
            {products.slice(0, 15).map(product => (
            <ProductCard
              key={product.id}
              image={product.thumbnailUrl}
              name={product.title} 
              price={product.price}
            />
            ))}
            </div>
        </div>
        {isModalOpen && <AddProductModal handleCloseModal={handleCloseModal} />}
        </>
    )
}

export default MainPage
