import React, {useState, useEffect} from 'react'
import profile_icon from '../../img/profile_icon.png'
import profile_icon2 from '../../img/profile_icon2.png'
import favorites from '../../img/favorites_icon.png'
import my_products from '../../img/my_products.png'
import exit from '../../img/exit_icon.png'
import vector_right from '../../img/vector_right.png'
import axios from "../../js/api/axios.js";
import { Link } from 'react-router-dom';

const SideBar = () => {
    const [username, setUsername] = useState('');
    const [user_email, setUser_email] = useState('');

    useEffect(() => {
        const existingData = JSON.parse(localStorage.getItem('SignupData'));
        if (existingData) {
            setUsername(existingData.username);
            setUser_email(existingData.email);
          }
    }, [])
    return (
        <>
        <div className="sidebar__container">
            <div className="sidebar__user__info">
                <img src={profile_icon} alt="#"/>
                <div className="user__info__control">
                    <b className="sidebar__user__name">{username}</b>
                    <p className="sidebar__user__email">{user_email}</p>
                </div>
            </div>
            <ul className="sidebar__categories">
                <li className="sidebar__category">
                    <img src={favorites} alt="#"/>
                    <b>Понравившиеся</b>
                    <Link to="/Favorites" className="sidebar__category__button"><img src={vector_right} alt="go"/></Link>
                </li>
                <li className="sidebar__category">
                    <img src={my_products} alt="#"/>
                    <b>Мои товары</b>
                    <Link to="/MyProducts" className="sidebar__category__button"><img src={vector_right} alt="go"/></Link>
                </li>
                <li className="sidebar__category">
                    <img src={exit} alt="#"/>
                    <b>Выход</b>
                    <Link className="sidebar__category__button" to="/"><img src={vector_right} alt="go"/></Link>
                </li>
            </ul>
        </div>
        </>
    )
}

export default SideBar
