import React, { useState, useEffect } from 'react';
import axios from '../api/axios.js';
import  logo from '../../img/main_page_icon.png';
import profile_icon from '../../img/profile_icon.png'
import { Link } from 'react-router-dom';
import '../../css/pages/MainPage.css';
import UserInfo from '../components/UserInfo';

const MainPage = () => {
    return (
        <>
        <div className="main_page__container">
            <div className="main_page__header">
                <img src={logo} alt="#"/>
                <div className="header__control">
                    <button className="button__upload">Подать обьявление</button>
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
        </>
    )
}

export default MainPage
