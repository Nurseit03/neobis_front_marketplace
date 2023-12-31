import React, {useState} from 'react';
import '../../css/pages/Login.css';
import Title from '../../js/components/Title';
import mobimarket from '../../img/mobimarket_background.png';
import exclamation from '../../img/exclamation.png';
import { useNavigate } from 'react-router-dom';
import ReactModal from 'react-modal';
import {useFormik} from 'formik';
import axios from "../api/axios";

const initialValues = {
    username:'',
    email:''
};


const Signup = () => {
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
          navigate("/SignupCreatePassword")
        }
    }

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
                <Title title="Регистрация" ReturnTo="/"/>
                <form className="form" onSubmit={formik.handleSubmit}>
                    <input className={`form__input ${isInvalid ? 'invalid' : ''}`} type="text" placeholder="Имя пользователя" name="username" id="username" maxLength={15} onChange={formik.handleChange} value={formik.values.username} onFocus={() => setIsInvalid(false)}/>
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
