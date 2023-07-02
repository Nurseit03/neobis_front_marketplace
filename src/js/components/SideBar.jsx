import React, {useState, useContext} from 'react'
import favorites from '../../img/favorites_icon.png'
import my_products from '../../img/my_products.png'
import exit from '../../img/exit_icon.png'
import vector_right from '../../img/vector_right.png'
import main from '../../img/my_products.png'
import { Link } from 'react-router-dom'
import UserInfo from '../components/UserInfo';
import { AuthContext } from './AuthProvider';

const SideBar = () => {
    const { isLogged } = useContext(AuthContext);
    
    const handleExit = () => {
        if (isLogged) {
          localStorage.removeItem('access-token');
          localStorage.removeItem('refresh-token');
        }
      }

    return (
        <>
        <div className="sidebar__container">
            <UserInfo />
            <ul className="sidebar__categories">
                <Link  to="/MainPage">
                <li className="sidebar__category">
                    <img src={main} alt="#"/>
                        <b>Главная</b>
                    <img className="sidebar__category__button" src={vector_right} alt="go"/>
                </li>
                </Link>
                <Link  to="/Favorites">
                <li className="sidebar__category">
                    <img src={favorites} alt="#"/>
                    <b>Понравившиеся</b>
                    <img className="sidebar__category__button" src={vector_right} alt="go"/>
                </li>
                </Link>
                <Link  to="/MyProducts">
                <li className="sidebar__category">
                    <img src={my_products} alt="#"/>
                    <b>Мои товары</b>
                    <img className="sidebar__category__button" src={vector_right} alt="go"/>
                </li>
                </Link>
                <Link  to="/">
                <li className="sidebar__category" onClick={handleExit}>
                    <img src={exit} alt="#"/>
                        <b>Выход</b>
                    <img className="sidebar__category__button" src={vector_right} alt="go"/>
                </li>
                </Link>
            </ul>
        </div>
        </>
    )
}

export default SideBar
