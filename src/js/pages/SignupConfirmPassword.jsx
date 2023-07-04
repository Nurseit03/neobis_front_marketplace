import React, { useState } from 'react';
import '../../css/pages/Login.css';
import mobimarket from '../../img/mobimarket_background.png';
import hide_password from '../../img/hide_password.png';
import show_password from '../../img/show_password.png';
import CreatePasswordTitle from '../components/CreatePasswordTitle';
import vector_left from '../../img/vector_left.png';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from "../api/axios";
import {useLocation} from 'react-router-dom';

const initialValues = {
  confirm_password: '',
};

const SignupConfirmPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false); 
  const location = useLocation();
  const password = location.state?.password || '';
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    if (password == values.confirm_password) {
      setPasswordsMatch(true);
      const existingData = JSON.parse(localStorage.getItem('SignupData'));
      const updatedData = {
            ...existingData,
            password: password,
            confirm_password: values.confirm_password
        };

      localStorage.setItem('SignupData', JSON.stringify(updatedData));
      handleSignup(updatedData);
    } else {
        setPasswordsMatch(false);
        alert("Паролb должны совпадать");
    }
  };

  const handleSignup = async (values) => {
    try {     
      console.log("data:",values)
      const response = await axios.post("/register/", JSON.stringify(values));

      if (!(response.status === 201 || response.status === 200)) {
        console.log(response);
        throw new Error("Network response was not ok");
      }
      
      console.log(response);
      navigate('/');
      return response;
    } catch (error) {
      console.log("Error:", error);
    }
}  

  const handleShowPassword = () => {
    setShowPassword(!showPassword); 
  };

  const formik = useFormik({
    initialValues,
    onSubmit
  });

  const isValidPasswordLength = formik.values.confirm_password.length >= 8 && formik.values.confirm_password.length <= 15;

  return (
    <>
      <div className="container" >
        <div className="wallpaper_container">
          <img src={mobimarket} alt="#"/>
        </div>
        <div className="form_container" >
          <div className="form__title w100">
            <Link className="return__button" to="/SignupCreatePassword">
              <img src={vector_left} alt="return"/>
            </Link>
            <h1>Регистрация</h1>
            <button className="show__password__button" type="button" onClick={handleShowPassword}><img src={showPassword ? hide_password : show_password} alt={showPassword ? 'hide' : 'show'} alt=""/></button>
          </div>
          <form className="form" onSubmit={formik.handleSubmit}>
            <CreatePasswordTitle title="Повторите пароль" subTitle="Минимальная длина — 8 символов. Для надежности пароль должен содержать буквы и цифры."/>
            <input type="password" className={`create__password__input ${!passwordsMatch ? 'input-error' : ''}`} type='password' name="password" id="password" onChange={formik.handleChange} value={password}/>
            <input type="password" className={`create__password__input ${!passwordsMatch ? 'input-error' : ''}`} type={showPassword ? 'text' : 'password'} name="confirm_password" id="confirm_password" onChange={formik.handleChange} placeholder=".   .   .   .   .   .   .   .   ." value={formik.values.confirm_password} maxLength={15} minLength={8}/>
            { !passwordsMatch ? <div className="input-error">Пароли не совпадают</div> : null}
            <button type="submit" id="form__submit__button" className={`form__button ${formik.values.confirm_password && isValidPasswordLength ? 'form__button--active' : ''}`} disabled={!formik.values.confirm_password}>Далее</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignupConfirmPassword;
