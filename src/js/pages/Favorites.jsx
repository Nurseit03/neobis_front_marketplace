import React from 'react'
import SideBar from '../../js/components/SideBar';
import MyFavoriteProducts from '../../js/components/MyFavoriteProducts';

const Favorites = () => {
    return (
        <>
        <div className="page__container">
            <SideBar />
            <MyFavoriteProducts />
        </div>
        </>
    )
}

export default Favorites
