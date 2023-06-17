import React, {useState, useEffect} from 'react';
import '../../css/pages/Login.css'
import shopping from '../../img/shopping.png';
import hide_password from '../../img/hide_password.png';
import show_password from '../../img/show_password.png';
import exclamation from '../../img/exclamation.png';
import lock from '../../img/lock.png';
import CreatePasswordTitle from '../components/CreatePasswordTitle'
import vector_left from '../../img/vector_left.png';
import { Link, useNavigate } from 'react-router-dom';
import ReactModal from 'react-modal';
import {useFormik} from 'formik';
import axios from "../api/axios";

const initialValues = {
    password: '',
};


const SignupCreatePassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        if(isPasswordValid && isDigitPresent && isSpecialCharPresent){
        console.log('Form data:', values);
        
        //Получение существующих данных из локалстор
        const existingData = JSON.parse(localStorage.getItem('SignupData'));

        //Обновление существующих данных с новыми данными о паролях
        const updatedData = {
            ...existingData,
            password: values.password,
            confirm_password: values.confirm_password
        };

        //Сохранение обновленных данных в локалстор
        localStorage.setItem('SignupData', JSON.stringify(updatedData));
        handleSignup(values);
        }   else{
            console.log("fail")
        }
    };  

    const handleSignup = async (values) => {
        try {
            const response = await axios.put("/register/", values);
      
            if (!(response.status === 201 || response.status === 200)) {
              console.log(response)
              throw new Error("Network response was not ok");
            }
      
            console.log(response);
            return response;
          } catch (error) {
            console.log("Error:", error)
          }
    }
    
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
    // const isPasswordConfirmed = formik.touched.confirm_password && !formik.errors.confirm_password && formik.values.confirm_password && formik.values.password === formik.values.confirm_password;
    const isValidPasswordLength = formik.values.password.length >= 8 && formik.values.password.length <= 15;

    return (
        <>
        <div className="container" >
            <div className="wallpaper_container">
                <img src={shopping} alt="#"/>
                <p className="wallpaper__title">MOBI MARKET</p>
            </div>
            <div className="form_container" >
                <div className="form__title">
                    <button className="return__button"><Link to="/"><img src={vector_left} alt="return"/></Link></button>
                    <h1>Регистрация</h1>
                </div>
                <form className="form" onSubmit={formik.handleSubmit}>
                    <CreatePasswordTitle title="Придумайте пароль"/>
                    <input type="password" className="create__password__input" name="password" id="password" onChange={formik.handleChange} value={formik.values.password} maxLength={15}/>
                    <button type="submit"  id="form__submit__button"  className={`form__button ${formik.values.password ? 'form__button--active' : ''}`} disabled={!formik.values.password}>Далее</button>
                </form>
            </div>
        </div>
        </>
    )
}

export default SignupCreatePassword;
