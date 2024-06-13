import React from 'react'
import './Auth.css'
import axios from 'axios'
import LoginElement from '../LoginElement/LoginElement'
import AuthButton from '../AuthButton/AuthButton'
import { useNavigate } from 'react-router-dom'


const Auth = () => {

    const isEnglish = true
    const nav = useNavigate()

    function get_current_values(){
        const email = document.getElementsByClassName("login-element-input")[0].value
        const password = document.getElementsByClassName("login-element-input")[1].value
        return {email: email, pwd: password}
    }

    const fetchData = async (data) => {
        try {
            const response = await axios.post('auth/login', data, {
                headers: {
                'Content-Type': 'application/json'
            }})
            nav("../portfolio")
        } catch (error) {
            alert(isEnglish ? "Username or password are incorrect" : "Неправильне ім`я або пароль")
        }

    }

    function buttonOnClick(){

        const dataObject = get_current_values()
        fetchData(dataObject)      
   
    }

  return (
    <div className='auth-container'>
        <div className='auth-header'>
            {isEnglish ? "Sign in" : "Увійти"}
        </div>
        <div className='auth-redirect'>
        {isEnglish ? "Have no account?" : "Немає акаунта?"}
            <a href='/register'>  {isEnglish ? "Register" : "Зареєструватись"} </a>
        </div>
        <div className='login-elements'>
            <LoginElement name =  {isEnglish ? "Username" : "Ім'я користувача"} src = "./Static/person.png"/>
            <LoginElement name = {isEnglish ? "Password"  : "Пароль"}src = "./Static/password.png"/>
        </div>
        <div className='auth-button'>
            <AuthButton name = {isEnglish ? "Sign in" : "Увійти"} function = {buttonOnClick} />
        </div>
    </div>
  )
}

export default Auth