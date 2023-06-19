import React, {useState} from 'react'
import profile_icon from '../../img/profile_icon.png'
import profile_icon2 from '../../img/profile_icon2.png'
import favorites from '../../img/favorites_icon.png'
import my_products from '../../img/my_products.png'
import exit from '../../img/exit_icon.png'
import vector_right from '../../img/vector_right.png'

const SideBar = () => {
    return (
        <>
        <div className="sidebar__container">
            <div className="sidebar__user__info">
                <img src={profile_icon} alt="#"/>
                <div className="user__info__control">
                    <b className="sidebar__user__name">Алесястар</b>
                    <p className="sidebar__user__email">sergeycrash01</p>
                </div>
            </div>
            <ul className="sidebar__categories">
                <li className="sidebar__category">
                    <img src={favorites} alt="#"/>
                    <b>Понравившиеся</b>
                    <button className="sidebar__category__button"><img src={vector_right} alt="go"/></button>
                </li>
                <li className="sidebar__category">
                    <img src={my_products} alt="#"/>
                    <b>Мои товары</b>
                    <button className="sidebar__category__button"><img src={vector_right} alt="go"/></button>
                </li>
                <li className="sidebar__category">
                    <img src={exit} alt="#"/>
                    <b>Выход</b>
                    <button className="sidebar__category__button"><img src={vector_right} alt="go"/></button>
                </li>
            </ul>
        </div>
        </>
    )
}

export default SideBar
