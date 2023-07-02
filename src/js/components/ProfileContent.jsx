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
    const [phoneNumber,setPhoneNumber] = useState ('');
    const [isCodeTrue, setIsCodeTrue] = useState(true);
    const [isPhoneNumberComplete, setIsPhoneNumberComplete] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isSecondModalOpen, setSecondModalOpen] = useState(false);
    const [isNumberRegistered , setIsNumberRegistered] = useState(false);
    const [username, setUsername] = useState('');
    const [firstName,setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [ email, setEmail] = useState('');
 
    useEffect(() => {
        const existingData = JSON.parse(localStorage.getItem('SignupData'));
        if (existingData) {
            setUsername(existingData.username);
            setFirstName(existingData.first_name);
            setLastName(existingData.last_name);
            setDateOfBirth(existingData.date_of_birth);
            setEmail(existingData.email);
          }
    }, [])

    const handleOpenModal = () => {
      setModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setModalOpen(false);
    };

    const handleCloseSecondModal = () => {
      setSecondModalOpen(false);
      setModalOpen(true);
    }

    const handleCheckCode = async() => {
        try {
          const response = await axios.post("/verify_phone/", verificationCode);
    
          if (!(response.status === 201 || response.status === 200)) {
            console.log(response);
            throw new Error("Network response was not ok");
          }
          setIsNumberRegistered(true);
          console.log("Successfully sended code",verificationCode);
          console.log(response);
          return response;
        } catch (error) {
          setSecondModalOpen(true);
          console.log("PhoneNumber:",phoneNumber);
          console.log("Fail send code",verificationCode);
          console.log("Error:", error);
        }
    }

    const sendVerificationCode = async () => {
        try {
          const accessToken = localStorage.getItem('access-token');
          const response =  await axios.put("/send_verification_code/",
          {
            phone_number: phoneNumber.toString()
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );
          if (response.status === 400){
            setIsNumberRegistered(true);
          }

          if (!(response.status === 201 || response.status === 200)) {
            console.log(response);
            throw new Error("Network response was not ok");
          }
          
          setIsCodeTrue(true);
          setModalOpen(false);
          setSecondModalOpen(true);
          console.log(response);
          return response;
        } catch (error) {
          setIsCodeTrue(false);
          console.log("Error:", error);
        }
    };

    const handleOnChangeVerificationCode = (res) => {
        setVerificationCode(res);
            if(verificationCode.length==4){
                handleCheckCode(verificationCode);
            }
                  
    };
    



    const onSubmit = async (values) => {
        console.log('Form data:',values);
        handleProfile(values);
    };

    const handleProfile = async (values) => {
        try {
          let accessToken = localStorage.getItem('access-token');
          const response = await axios.put("/profile/", values, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });

          if (!(response.status === 201 || response.status === 200)) {
            console.log(response);
            throw new Error("Network response was not ok");
          }
          
          const existingData = JSON.parse(localStorage.getItem('SignupData'));
          if (existingData) {
            const updatedData = { ...existingData, ...values };
            localStorage.setItem('SignupData', JSON.stringify(updatedData));
          }

          console.log(response);
          window.location.reload();
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
                <input className="user__info__input" type="text" placeholder={firstName ? firstName : "Имя"} name="first_name" id="first_name" onChange={formik.handleChange} value={formik.values.first_name}/>
                <input className="user__info__input" type="text" placeholder={lastName ? lastName : "Фамилия"} name="last_name" id="last_name" onChange={formik.handleChange} value={formik.values.last_name}/>
                <input className="user__info__input" type="text" placeholder={username ? username : "Никнейм"} name="username" id="username" onChange={formik.handleChange} value={formik.values.username}/>
                <input className="user__info__input" type="date" name="date_of_birth" id="date_of_birth" onChange={formik.handleChange} value={formik.values.date_of_birth || dateOfBirth}/>
                </div>

                <div className="form__control">
                <button className="form__add__number" type="button" onClick={handleOpenModal}>
                {localStorage.getItem('SignupData')?.phone_number ? (
                    <p style={{color:'grey'}}>{localStorage.getItem('SignupData').phone_number}</p>
                    ) : (
                      <p>Добавить номер</p>
                    )}
                </button>
                <input className="user__info__input" type="email" placeholder={email ? email : "Почта"} name="email" id="email"/>
                </div>
                <button className="form__complete" type="submit" onClick={onSubmit}>Готово</button>
            </form>
        </div>

                        {/* ПЕРВОЕ МОДАЛЬНОЕ ОКНО */}
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
            onChange={(phoneNumber) => {
              if(phoneNumber>1){
                setPhoneNumber(phoneNumber);
                setIsPhoneNumberComplete(phoneNumber.length === 13);
                }
              }}
            />
            {isNumberRegistered ? <div className="error">Данный номер уже зарегистрирован</div> : null}
            <button className={`modal__continue__button ${isPhoneNumberComplete ? 'complete' : ''}`} type="button" onClick={sendVerificationCode}>Далее</button>
        </ReactModal>



                              {/* ВТОРОЕ МОДАЛЬНОЕ ОКНО (потом на компоненты разделить) */}
        <ReactModal
            isOpen={isSecondModalOpen}
            onRequestClose={handleCloseSecondModal}
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
            <button onClick={handleCloseSecondModal} className="modal__continue__button">Вернуться</button>
            {!isCodeTrue ? <div className="error">Неверный код</div> : null} 
        </ReactModal>
        </>
    )
}

export default ProfileContent;
