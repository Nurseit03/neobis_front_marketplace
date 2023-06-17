import React, { useState } from 'react';
import '../../css/pages/Login.css';
import shopping from '../../img/shopping.png';
import hide_password from '../../img/hide_password.png';
import show_password from '../../img/show_password.png';
import CreatePasswordTitle from '../components/CreatePasswordTitle';
import vector_left from '../../img/vector_left.png';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from "../api/axios";

const initialValues = {
  password: '',
};

const SignupCreatePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    if (isPasswordValid && isDigitPresent && isSpecialCharPresent && isValidPasswordLength) {
      console.log('Form data:', values);
      navigate("/SignupConfirmPassword", { state: { password: values.password } });
    } else {
        alert("Пароль должен содержать спец.символы и цифры");
    }
  };  

  const handleShowPassword = () => {
    setShowPassword(!showPassword); 
  };

  const formik = useFormik({
    initialValues,
    onSubmit
  });

  const isPasswordValid = formik.touched.password && !formik.errors.password && formik.values.password && /[A-Z]/.test(formik.values.password);
  const isDigitPresent = formik.touched.password && !formik.errors.password && formik.values.password.match(/^(?=.*\d)/);
  const isSpecialCharPresent = formik.touched.password && !formik.errors.password && formik.values.password.match(/^(?=.*[!@#$%^&*()])/);
  const isValidPasswordLength = formik.values.password.length >= 8 && formik.values.password.length <= 15;

  return (
    <>
      <div className="container" >
        <div className="wallpaper_container">
          <img src={shopping} alt="#"/>
          <p className="wallpaper__title">MOBI MARKET</p>
        </div>
        <div className="form_container" >
          <div className="form__title w100">
            <button className="return__button"><Link to="/Signup"><img src={vector_left} alt="return"/></Link></button>
            <h1>Регистрация</h1>
            <button className="show__password__button" type="button" onClick={handleShowPassword}><img src={showPassword ? hide_password : show_password} alt={showPassword ? 'hide' : 'show'} alt=""/></button>
          </div>
          <form className="form" onSubmit={formik.handleSubmit}>
            <CreatePasswordTitle title="Придумайте пароль"/>
            <input type="password" className="create__password__input" type={showPassword ? 'text' : 'password'} name="password" id="password" onChange={formik.handleChange} placeholder=".   .   .   .   .   .   .   .   ." value={formik.values.password} maxLength={15}/>
            <button type="submit" id="form__submit__button" className={`form__button ${formik.values.password && isValidPasswordLength ? 'form__button--active' : ''}`} disabled={!formik.values.password || !isValidPasswordLength}>Далее</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignupCreatePassword;
