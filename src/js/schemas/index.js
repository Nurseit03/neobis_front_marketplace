import * as yup from 'yup';

const regName = /^[a-zA-Z]+$/;
const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const basicSchema =  yup.object().shape({
    first_name: yup.string().matches(regName, {message: "Только буквы"}).required("Обязательное поле"),
    last_name: yup.string().matches(regName, {message: "Только буквы"}).required("Обязательное поле"),
    date_born: yup.date().required("Обязательное поле"),
    // email:  yup.string().matches(regEmail, {message:"Введите корректный адрес эл.почты"}).required("Обязательное поле")
    phone_number: yup.string().matches(/^\d+$/, 'Введите только цифры').max(10, 'Длина номера не должна превышать 10 цифр').required('Введите номер телефона')
});

export default basicSchema;