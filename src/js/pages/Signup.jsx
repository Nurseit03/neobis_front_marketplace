import React, {useState, useEffect} from 'react';
import '../../css/pages/Login.css'
import shopping from '../../img/shopping.png';
import hide_password from '../../img/hide_password.png';
import show_password from '../../img/show_password.png';
import exclamation from '../../img/exclamation.png';
import vector_left from '../../img/vector_left.png';
import { Link, useNavigate } from 'react-router-dom';
import ReactModal from 'react-modal';
import {useFormik} from 'formik';
import axios from "../api/axios";

const initialValues = {
    username:'',
    email:''
};


const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalText, setModalText] = useState('');
    const [isInvalid, setIsInvalid] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        console.log('Form data:',values);
        handleLogin(values);
    };

    const handleLogin = async (values) => {
        try {
          const response = await axios.post("/login/", values);
    
          if (!(response.status === 201 || response.status === 200)) {
            console.log(response)
            throw new Error("Network response was not ok");
          }
          setIsInvalid(true);
          openModal('Данный пользователь уже зарегистрирован');
        } catch (error) {
          setIsModalOpen(false);
          localStorage.setItem('SignupData', JSON.stringify(values));
          const savedData = JSON.parse(localStorage.getItem('SignupData'));
          console.log("Saved data:", savedData);
          navigate("/SignupCreatePassword")
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
                <img src={shopping} alt="#"/>
                <p className="wallpaper__title">MOBI MARKET</p>
            </div>
            <div className="form_container" >
                <div className="form__title">
                    <button className="return__button"><Link to="/"><img src={vector_left} alt="return"/></Link></button>
                    <h1>Регистрация</h1>
                </div>
                <form className="form" onSubmit={formik.handleSubmit}>
                    <input className={`form__input ${isInvalid ? 'invalid' : ''}`} type="text" placeholder="Имя пользователя" name="username" id="username" onChange={formik.handleChange} value={formik.values.username} onFocus={() => setIsInvalid(false)}/>
                    <div className="show__password__control">
                        <input className={`form__input ${isInvalid ? 'invalid' : ''}`} type="email" name="email" id="email" placeholder="Почта" onChange={formik.handleChange} value={formik.values.email} onFocus={() => setIsInvalid(false)}/>
                    </div>
                    <button type="submit"  id="form__submit__button"  className={`form__button ${formik.values.username && formik.values.email ? 'form__button--active' : ''}`} disabled={!formik.values.username || !formik.values.email}>Далее</button>
                </form>
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

export default Signup;
