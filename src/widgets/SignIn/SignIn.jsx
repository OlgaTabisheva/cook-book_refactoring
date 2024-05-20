import style from './SignIn.module.scss'
import InputAuth from "../../shared/InputAuth/InputAuth.jsx";
import ButtonBasic from "../../shared/Buttons/ButtonBasic/ButtonBasic.jsx";
import {useSignInEmailPassword, useSignUpEmailPassword} from '@nhost/react'
import {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";

function SignIn({password, setPassword}) {

  const {signInEmailPassword, isSuccess, isError, isLoading, error} =
    useSignInEmailPassword()
  const [emailInput, setEmailInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')

  const [formValiditySignIn, setFormValiditySignIn] = useState({
    emailValid: false,
    passwordValid: false,

  });
  const {emailValid, passwordValid} = formValiditySignIn;

  const isSubmitDisabled = !emailValid || !passwordValid;
  const disableForm = isLoading
  useEffect(function validateInputs() {
    const emailTest = /\S+@\S+\.\S+/;
    const isEmailInputFilled = emailInput.length > 4
    const isEmail = emailTest.test(emailInput)
    const isEmailInputValid = isEmailInputFilled && isEmail
    const isPasswordInputFilled = passwordInput.length >= 5
    const isPasswordInputValid = isPasswordInputFilled
    setFormValiditySignIn(prevValidity => ({
      emailValid: isEmailInputValid,
      passwordValid: isPasswordInputValid
    }))
  }, [emailInput, passwordInput,])

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
        <InputAuth
          id="email"
          name="emailInput"
          text={"Введите почту"}
          title={"Email:"}
          type="email"
          placeholder="user@mail.com"
          eye={false}
          errorText={"Введите правильный email адрес"}
          value={emailInput.toLowerCase()}
          required
          onChange={(e) => setEmailInput(e.target.value)}
          error={!emailValid}
        />
        <InputAuth
          id="password"
          text={"Введите пароль"}
          title={"Пароль:"}
          eye={true}
          type="password"
          placeholder="***"
          required
          password={password}
          setPassword={setPassword}
          errorText={"Введите правильный пароль"}
          name="passwordInput"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          error={!passwordValid}
        />
      </form>
      <div className={style.signIn__buttonBox}>
        <ButtonBasic text={'Войти'} color={'primaryGreen'} type={'submit'} onClick={handleOnSubmit}
                     disabled={isSubmitDisabled || disableForm}/>
        <a className={style.signIn__link}> Забыли пароль?</a>
      </div>
    </section>
  )
}

export default SignIn