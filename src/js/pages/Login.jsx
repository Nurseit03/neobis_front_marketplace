import React, {useState, useContext} from 'react';
import '../../css/pages/Login.css'
import mobimarket from '../../img/mobimarket_background.png';
import hide_password from '../../img/hide_password.png';
import show_password from '../../img/show_password.png';
import exclamation from '../../img/exclamation.png';
import { Link, useNavigate } from 'react-router-dom';
import ReactModal from 'react-modal';
import {useFormik} from 'formik';
import axios from "../api/axios.js";
import {AuthContext} from '../components/AuthProvider';

const initialValues = {
    username:'',
    password:''
};


const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalText, setModalText] = useState('');
    const [isInvalid, setIsInvalid] = useState(false);
    const { setIsLogged } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const onSubmit = async (values) => {
        console.log('Form data:',values);
        handleLogin(values);
    };

    const handleLogin = async (values) => {
        try {
          const response = await axios.post("/login/", values);
          localStorage.setItem('access-token', response.data.access);
          localStorage.setItem('refresh-token', response.data.refresh);
          setIsLogged(true);
          if (!(response.status === 201 || response.status === 200)) {
            console.log(response);
            throw new Error("Network response was not ok");
          }
        
          setIsModalOpen(false);
          navigate("/Profile");
          console.log(response);
          return response;
        } catch (error) {
          setIsInvalid(true);
          openModal('Неверный логин или пароль');
          console.log("Error:", error);
        }
    }
    
    const handleShowPassword = () => {
        setShowPassword(!showPassword); 
    };

    const openModal = (text) => {
        setModalText(text);
        setIsModalOpen(true);
        setTimeout(() => {
        closeModal();
        setIsModalOpen(false);
        }, 3000);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const formik = useFormik({
        initialValues,
        onSubmit
    });

    return (
        <>
        <div className="container" >
            <div className="wallpaper_container">
                <img src={mobimarket} alt="#"/>
            </div>
            <div className="form_container" >
                <form className="form" onSubmit={formik.handleSubmit}>
                    <input className={`form__input ${isInvalid ? 'invalid' : ''}`} type="text" placeholder="Имя пользователя" name="username" id="username" onChange={formik.handleChange} value={formik.values.username} onFocus={() => setIsInvalid(false)}/>
                    <div className="show__password__control">
                        <input className={`form__input ${isInvalid ? 'invalid' : ''}`} type={showPassword ? 'text' : 'password'} name="password" id="password" placeholder="Пароль" onChange={formik.handleChange} value={formik.values.password} onFocus={() => setIsInvalid(false)}/>
                        <button className="show__password__button" type="button" onClick={handleShowPassword}><img src={showPassword ? hide_password : show_password} alt={showPassword ? 'hide' : 'show'} alt=""/></button>
                    </div>
                    <button type="submit"  id="form__submit__button"  className={`form__button ${formik.values.username && formik.values.password ? 'form__button--active' : ''}`} disabled={!formik.values.username || !formik.values.password}>Войти</button>
                </form>
                <Link to="/Signup" className="get__started">Зарегистрироваться</Link>
            </div>
        </div>
        <ReactModal 
            isOpen={isModalOpen}
            contentLabel="successActionModal"
            style={{
                content: {
                display: 'flex',
                overflow: 'hidden', 
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '16px 20px',
                gap: '10px',
                position: 'absolute',
                width: '350px',
                height: '60px',
                background: '#F34545',
                boxShadow: '0px 2px 12px rgba(80, 85, 92, 0.12)',
                borderRadius: '16px',
                top: '5%',
                left: '50%',
                transform: 'translate(+60%, -50%)',
                },
                overlay: {
                    background: 'none',
                  }
            }}
            >
            <div style={{ overflow: 'hidden', display: 'flex', flexDirection: 'row', gap: '9px', alignItems: 'center'}}>
                <img src={exclamation} id="exclamation__img" alt=""/>
                <p className="modalText">{modalText}</p>
            </div>
        </ReactModal>
        </>
    )
}

export default Login;
