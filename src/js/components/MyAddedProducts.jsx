import React, { useState, useEffect } from 'react';
import Title from '../../js/components/Title';
import ProductCard from '../components/ProductCard';
import axios from '../api/axios';

const MyAddedProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const uploadedProducts = localStorage.getItem('UploadedProducts');
        let accessToken = localStorage.getItem('access-token');
        
        if (uploadedProducts) {
          const productIds = JSON.parse(uploadedProducts);
          const productRequests = productIds.map((id) =>
            axios.get(`/products/${id}/`, {
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
            })
          );
          const productResponses = await Promise.all(productRequests);
          const productsData = productResponses.map((response) => response.data);
          setProducts(productsData);
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchProducts();
  }, []);

  return (
    <>
      <div className="main_page__container">
        <div className="main_page__header">
          <Title title="Мои товары" ReturnTo="/MainPage" className="main_page__title" />
        </div>
        <div className="all_items">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard
                product_id={product.id}
                like_count={product.like_count}
                name={product.name}
                price={product.price}
                photo={product.photo}
                full_description={product.full_description}
                short_description={product.short_description}
                owner={product.owner}
                likes={product.likes}
                isMyAddedProductsPage={true}
              />
            ))
          ) : (
            <p>Нет доступных продуктов</p>
          )}
        </div>
      </div>
    </>
  );
};

export default MyAddedProducts;
