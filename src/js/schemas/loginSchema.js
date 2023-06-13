import * as yup from 'yup';

const loginSchema =  yup.object().shape({
    name:  yup.string().required("Неверный логин или пароль"),
    password: yup.string().required("Неверный логин или пароль")
});

export default loginSchema;