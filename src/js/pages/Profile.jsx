import React from 'react';
import SideBar from '../../js/components/SideBar';
import Main from '../../js/components/Main';
import '../../css/pages/Profile.css'

const Profile = () => {
    return (
        <>
        <div className="profile">
            <SideBar />
            <Main />
        </div>
        </>
    )
}

export default Profile
