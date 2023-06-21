import React ,{useState} from 'react'
import vector_left from '../../img/vector_left.png';
import hide_password from '../../img/hide_password.png';
import show_password from '../../img/show_password.png';
import { Link } from 'react-router-dom';
import axios from "../../js/api/axios.js";

const Title = ({title,showPasswordButton,className, showPassword, handleShowPassword}) => { 
    return (
        <div className={`form__title ${className}`}>
            <div className='return__button__control'>
                <button className="return__button"><Link to="/"><img src={vector_left} alt="return"/></Link></button>
                <h3>Назад</h3>
            </div>
            <h1>{title}</h1>
            {showPasswordButton=="yes" &&(<button className="show__password__button" type="button" onClick={handleShowPassword}><img src={showPassword ? hide_password : show_password} alt={showPassword ? 'hide' : 'show'} alt=""/></button>)}
        </div>
    )
}

export default Title