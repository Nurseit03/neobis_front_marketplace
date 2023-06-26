import React, { useState, useEffect } from 'react';
import axios from '../api/axios.js';
import  logo from '../../img/main_page_icon.png';
import profile_icon from '../../img/profile_icon.png'
import { Link } from 'react-router-dom';
import '../../css/pages/MainPage.css';
import AddProductModal from '../components/AddProductModal';
import UserInfo from '../components/UserInfo';

const MainPage = () => {
    const [isModalOpen, setModalOpen] = useState(false);

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
                <div className="product__card">
                    
                </div>
                <div className="product__card">
                    
                </div>
                <div className="product__card">
                    
                </div>
                
            </div>
        </div>
        {isModalOpen && <AddProductModal handleCloseModal={handleCloseModal} />}
        </>
    )
}

export default MainPage
