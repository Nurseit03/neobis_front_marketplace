import React from 'react'
import Title from '../../js/components/Title';
import profile_icon2 from '../../img/profile_icon2.png';
import {useFormik} from 'formik';
import axios from "../../js/api/axios.js";

const initialValues = {
    firstname:'',
    lastname: '',
    nickname:'',
    date_born:'',
    email:''
};

const Main = () => {
    const onSubmit = async (values) => {
        console.log('Form data:',values);
        handleLogin(values);
    };

    const handleLogin = async (values) => {
        try {
          const response = await axios.post("/update-data/", values);
    
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
        <div className="main__container">
            <Title title="Профиль" className="main__container__title"/>
            <div className="profile__photo__change">
                <img src={profile_icon2} alt="img" style={{width:'80px',height:'80px'}}/>
                <button className="photo__change__button"><p>Выбрать фотографию</p></button>
            </div>
            <form className="main__container__user__info" onSubmit={formik.handleSubmit}>
                <div className="form__control">
                <input className="user__info__input" type="text" placeholder="Имя" name="firstname" id="firstname" onChange={formik.handleChange} value={formik.values.firstname}/>
                <input className="user__info__input" type="text" placeholder="Фамилия" name="lastname" id="lastname" onChange={formik.handleChange} value={formik.values.lastname}/>
                <input className="user__info__input" type="text" placeholder="Никнейм" name="nickname" id="nickname" onChange={formik.handleChange} value={formik.values.nickname}/>
                <input className="user__info__input" type="date" placeholder="Дата рождения" name="date_born" id="date_born" onChange={formik.handleChange} value={formik.values.date_born}/>
                </div>

                <div className="form__control">
                <button className="form__add__number"type="button">Добавить номер</button>
                <input className="user__info__input" type="email" placeholder="Почта" name="email" id="email" onChange={formik.handleChange} value={formik.values.email}/>
                </div>
                <button className="form__complete" type="submit">Готово</button>
            </form>
        </div>
    )
}

export default Main
