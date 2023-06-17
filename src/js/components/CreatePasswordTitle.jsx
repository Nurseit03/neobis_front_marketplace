import React from 'react'
import lock from '../../img/lock.png';
import '../../css/components/SignupCreatePassword.css'


const CreatePasswordTitle = ({title}) => {
    return (
        <div className="title__container">
            <img src={lock} alt="#"/>
            <h2>{title}</h2>
            <p className="title__container__text">Минимальная длина — 8 символов. Для надежности пароль должен содержать буквы и цифры.</p>
        </div>
    )
}

export default CreatePasswordTitle;
