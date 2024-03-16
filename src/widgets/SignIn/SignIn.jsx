import style from './SignIn.module.scss'
import InputAuth from "../../shared/InputAuth/InputAuth.jsx";
import ButtonBasic from "../../shared/Buttons/ButtonBasic/ButtonBasic.jsx";
import {useSignInEmailPassword} from '@nhost/react'
import {useState} from "react";
import {Navigate} from "react-router-dom";

function SignIn({password, setPassword}) {

  const {signInEmailPassword, isSuccess, isError, error} =
    useSignInEmailPassword()
  const [emailInput, setEmailInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')

  const handleOnSubmit = (e) => {
    e.preventDefault()
    signInEmailPassword(emailInput, passwordInput)

  }
  if (isSuccess) {
    return <Navigate to="/user" replace={true}/>
  }

  return (
    <section className={style.signIn}>
      <form className={style.signIn__box} onSubmit={handleOnSubmit}>
        <InputAuth text={"Введите почту"} title={"Email:"} eye={false} value={emailInput} onChange={(e) => setEmailInput(e.target.value)}/>
        <InputAuth text={"Введите пароль"} title={"Пароль:"} eye={true} password={password} setPassword={setPassword} value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)}/>
      </form>
      <div className={style.signIn__buttonBox}>
        <ButtonBasic text={'Войти'} color={'primaryGreen'} type={'submit'} onClick={handleOnSubmit}/>
        <a className={style.signIn__link}> Забыли пароль?</a>
      </div>
    </section>
  )
}

export default SignIn