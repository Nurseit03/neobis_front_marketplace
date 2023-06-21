import React from 'react'
import lock from '../../img/lock.png';
import '../../css/components/SignupCreatePassword.css'


const CreatePasswordTitle = ({title, subTitle}) => {
    return (
        <div className="title__container">
            <img src={lock} alt="#"/>
            <h2>{title}</h2>
            <p className="title__container__text">{subTitle}</p>
        </div>
    )
}

export default CreatePasswordTitle;
