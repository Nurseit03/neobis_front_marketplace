import React, { useState, useEffect } from 'react';
import profile_icon from '../../img/profile_icon.png'
import { Link } from 'react-router-dom';

const UserInfo = () => {
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
        <Link to="/Profile">
        <div className="sidebar__user__info">
            <img src={profile_icon} alt="#"/>
            <div className="user__info__control">
                <b className="sidebar__user__name">{username}</b>
                <p className="sidebar__user__email">{user_email}</p>
            </div>
        </div>
        </Link>
    )
}

export default UserInfo
