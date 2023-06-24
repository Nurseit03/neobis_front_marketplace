import React from 'react'
import SideBar from '../../js/components/SideBar';
import MyAddedProducts from '../../js/components/MyAddedProducts';

function MyProducts() {
    return (
        <>
        <div className="page__container">
        <SideBar />
        <MyAddedProducts />
        </div>
        </>
    )
}

export default MyProducts
