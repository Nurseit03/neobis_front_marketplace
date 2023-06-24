import React , {useState , useEffect} from 'react'
import Title from './Title';
import ResendTimer from './ResendTimer';
import CreatePasswordTitle from './CreatePasswordTitle';
import profile_icon2 from '../../img/profile_icon2.png';
import {useFormik} from 'formik';
import axios from "../api/axios.js";
import { Link, useNavigate } from 'react-router-dom';
import ReactModal from 'react-modal';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import AuthCode from 'react-auth-code-input';

const initialValues = {
    first_name:'',
    last_name: '',
    username:'',
    date_of_birth:''
};

const ProfileContent = () => {
    const [verificationCode, setVerificationCode] = useState('');
    const [phoneNumber,setPhoneNumber] = useState ();
    const [isCodeTrue, setIsCodeTrue] = useState(true);
    const [isPhoneNumberComplete, setIsPhoneNumberComplete] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isSecondModalOpen, setSecondModalOpen] = useState(false);
    const [isNumberRegistered , setIsNumberRegistered] = useState();
    const [username, setUsername] = useState('');

    useEffect(() => {
        const existingData = JSON.parse(localStorage.getItem('SignupData'));
        if (existingData) {
            setUsername(existingData.username);
          }
    }, [])

    const handleOpenModal = () => {
      setModalOpen(true);
      setIsNumberRegistered(true); 
    };
  
    const handleCloseModal = () => {
      setModalOpen(false);
    };

    const handleCheckNumber = () => {
        try {
          const response = axios.post("/verify_phone/", phoneNumber);
    
          if (!(response.status === 201 || response.status === 200)) {
            console.log(response);
            throw new Error("Network response was not ok");
          }
          setIsNumberRegistered(true);
          console.log(response);
          return response;
        } catch (error) {
          setIsNumberRegistered(false);
          setSecondModalOpen(true);
          console.log("Error:", error);
        }
    }

    const sendVerificationCode = () => {
        try {
          const response =  axios.post("/send_verification_code/",{
            phone_number: phoneNumber.toString()
          });
    
          if (!(response.status === 201 || response.status === 200)) {
            console.log(response);
            throw new Error("Network response was not ok");
          }
          
          setIsCodeTrue(true);
          console.log(response);
          return response;
        } catch (error) {
          setIsCodeTrue(false);
          console.log("Error:", error);
        }
    };

    const handleOnChangeVerificationCode = (res) => {
        setVerificationCode(res);
        setTimeout(() => {
            if(verificationCode.length==3){
                sendVerificationCode(phoneNumber);
            }
          }, 500);
                  
    };
    



    const onSubmit = async (values) => {
        console.log('Form data:',values);
        handleProfile(values);
    };

    const handleProfile = async (values) => {
        try {
          const response = await axios.post("/profile/", values);
    
          if (!(response.status === 201 || response.status === 200)) {
            console.log(response);
            throw new Error("Network response was not ok");
          }
          
          console.log(response);
          return response;
        } catch (error) {
          console.log("Error:", error);
        }
    }

    const formik = useFormik({
        initialValues,
        onSubmit
    });
    return (
        <>
        <div className="main__container">
            <Title ReturnTo="/MainPage" title="Профиль" className="main__container__title"/>
            <div className="profile__photo__change">
                <img src={profile_icon2} alt="img" style={{width:'80px',height:'80px'}}/>
                <button className="photo__change__button"><p>Выбрать фотографию</p></button>
            </div>
            <form className="main__container__user__info" onSubmit={formik.handleSubmit}>
                <div className="form__control">
                <input className="user__info__input" type="text" placeholder="Имя" name="first_name" id="first_name" onChange={formik.handleChange} value={formik.values.first_name}/>
                <input className="user__info__input" type="text" placeholder="Фамилия" name="last_name" id="last_name" onChange={formik.handleChange} value={formik.values.last_name}/>
                <input className="user__info__input" type="text" placeholder={username} name="username" id="username" onChange={formik.handleChange} value={formik.values.username}/>
                <input className="user__info__input" type="date" placeholder="Дата рождения" name="date_of_birth" id="date_of_birth" onChange={formik.handleChange} value={formik.values.date_of_birth}/>
                </div>

                <div className="form__control">
                <button className="form__add__number" type="button" onClick={handleOpenModal}>
                    <p>Добавить номер</p>
                    <p style={{color:'grey'}}>{phoneNumber}</p> </button>
                <input className="user__info__input" type="email" placeholder="Почта" name="email" id="email"/>
                </div>
                <button className="form__complete" type="submit" onClick={onSubmit}>Готово</button>
            </form>
        </div>
        <ReactModal
            isOpen={isModalOpen}
            onRequestClose={handleCloseModal}
            contentLabel="Модальное окно"
            className="modal__content"
            overlayClassName="modal__overlay"
        >
            <b className="modal__title">Изменить номер телефона</b>
            <CreatePasswordTitle title="Введите номер телефона" subTitle="Мы отправим вам СМС с кодом подтверждения"/>
            <PhoneInput
            international
            countryCallingCodeEditable={false}
            defaultCountry="KG"
            placeholder="Введите номер телефона"
            value={phoneNumber}
            onChange={setPhoneNumber}
            limitMaxLength={true}
            onChange={(value) => {
                setPhoneNumber(value);
                setIsPhoneNumberComplete(value.length === 13);
              }}
            />
            {!isNumberRegistered ? <div className="error">Данный номер уже зарегистрирован</div> : null}
            <button className={`modal__continue__button ${isPhoneNumberComplete ? 'complete' : ''}`} type="button" onClick={handleCheckNumber}>Далее</button>
        </ReactModal>




        <ReactModal
            isOpen={isSecondModalOpen}
            onRequestClose={handleCloseModal}
            contentLabel="Модальное окно"
            className="modal__content"
            overlayClassName="modal__overlay"
        >
            <CreatePasswordTitle title="Введите код из смс"/>
            <AuthCode
                length={4}
                onChange={handleOnChangeVerificationCode} 
                placeholder="0"
                allowedCharacters="numeric"
                containerClassName="verification__code__container"
                inputClassName="verification__code"
                />
            <div className="repeatSendCodeTimer">
                <ResendTimer phoneNumber={phoneNumber} setIsCodeTrue={setIsCodeTrue}/>
            </div>
            {!isCodeTrue ? <div className="error">Неверный код</div> : null} 
        </ReactModal>
        </>
    )
}

export default ProfileContent;
