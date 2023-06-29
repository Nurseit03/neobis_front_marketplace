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
        const fetchData = async () => {
            try {
                let accessToken = localStorage.getItem('access-token');
                const response = await axios.get("/products/", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                setProducts(response.data);
            } catch (error) {
                console.log("Error:", error);
            }
        };
    
        fetchData();
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
            {products.map(product => (
            <ProductCard
              product_id={product.id}
              like_count={product.like_count}
              name={product.name} 
              price={product.price}
              photo={product.photo}
              description={product.description}
              owner={product.owner}
              likes={product.likes}

            />
            ))}
            </div>
        </div>
        {isModalOpen && <AddProductModal handleCloseModal={handleCloseModal} />}
        </>
    )
}

export default MainPage
