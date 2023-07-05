import React, {useState, useEffect} from 'react';
import Title from '../../js/components/Title';
import ProductCard from '../components/ProductCard';
import axios from '../api/axios';


const MyFavoriteProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const accessToken = localStorage.getItem('access-token');
            const response = await axios.get('/favorites/', {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
            console.log('Successful get favorites:', response);
            
            const favoriteProducts = response.data;
            const productIds = favoriteProducts.map((item) => item.product);
            
            const productRequests = productIds.map((productId) =>
              axios.get(`/products/${productId}/`, {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              })
            );
            
            const productResponses = await Promise.all(productRequests);
            const productData = productResponses.map((res) => res.data);
    
            setProducts(productData);
          } catch (error) {
            console.log('Error:', error);
          }
        };
    
        fetchData();
      }, []);
        
    return (
        <>
        <div className="main_page__container">
            <div className="main_page__header">
                <Title title="Понравившиеся" ReturnTo="/MainPage" className="main_page__title" />
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
                        description={product.description}
                        owner={product.owner}
                        likes={product.likes}
                        full_description={product.full_description}
                        short_description={product.short_description}
                    />
                    ))
                        ) : (<p>Нет доступных продуктов</p>)}
            </div>
        </div>
        </>
    )
}

export default MyFavoriteProducts
