import React from 'react';
import SideBar from '../../js/components/SideBar';
import ProfileContent from '../components/ProfileContent';
import '../../css/pages/Profile.css'

const Profile = () => {
    return (
        <>
        <div className="page__container">
            <SideBar />
            <ProfileContent />
        </div>
        </>
    )
}

export default Profile
