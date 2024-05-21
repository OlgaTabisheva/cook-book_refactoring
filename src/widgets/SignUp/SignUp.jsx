import style from './SignUp.module.scss'
import InputAuth from "../../shared/InputAuth/InputAuth.jsx";
import ButtonBasic from "../../shared/Buttons/ButtonBasic/ButtonBasic.jsx";
import {useEffect, useState} from "react";
import {useSignUpEmailPassword} from "@nhost/react";
import {Navigate, useNavigate} from "react-router-dom";
import {nhost} from "../../main.jsx";
import {toast} from "react-hot-toast";

function SignUp({password, setPassword}) {

  const [emailInput, setEmailInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [passwordRepeatInput, setPasswordRepeatInput] = useState('')
  const {signUpEmailPassword, isLoading, isSuccess, needsEmailVerification, isError, error} =
    useSignUpEmailPassword()
  const [formValiditySignUp, setFormValiditySignUp] = useState({
    emailValid: false,
    passwordValid: false,
    passwordValidRepeat: false
  });
  const {emailValid, passwordValid, passwordValidRepeat} = formValiditySignUp;

  const isSubmitDisabled = !emailValid || !passwordValid || !passwordValidRepeat;
  const disableForm = isLoading || needsEmailVerification
  const navigate = useNavigate();
  useEffect(function validateInputs() {
    const emailTest = /\S+@\S+\.\S+/;
    const isEmailInputFilled = emailInput.length > 4
    const isEmail = emailTest.test(emailInput)
    const isEmailInputValid = isEmailInputFilled && isEmail
    const isPasswordInputFilled = passwordInput.length >= 5
    const isPasswordInputValid = isPasswordInputFilled
    const isPasswordRepeat = passwordInput === passwordRepeatInput
    setFormValiditySignUp(prevValidity => ({
      emailValid: isEmailInputValid,
      passwordValid: isPasswordInputValid,
      passwordValidRepeat: isPasswordRepeat
    }))
  }, [emailInput, passwordInput, passwordRepeatInput])


  const onSubmit = (data, e) => console.log(data, e);

  const handleOnSubmit = (e) => {
    e.preventDefault()
    nhost.auth.signUp({
      email: emailInput,
      password: passwordInput
    }).then(
      navigate(`/user`)    )
  }

  useEffect(() => {
    if (error) {
      toast.error('Произошла ошибка', error)    }
  }, [ error])

  return (
    <section className={style.signUp}>
      <form className={style.signUp__box} onSubmit={handleOnSubmit}>
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
          //textError={"Пароль слишком короткий"}
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
          errorText={"Пароль слишком короткий"}
          name="passwordInput"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          error={!passwordValid}
          //textError={"Пароль слишком короткий22"}
        />

        <InputAuth
          type="password"
          id="password"
          text={"Введите пароль"}
          title={"Повторите пароль:"}
          eye={true}
          password={password}
          setPassword={setPassword}
          errorText={"Введенные пароли не совпадают"}
          name="passwordInputRepeat"
          placeholder="***"
          value={passwordRepeatInput}
          onChange={(e) => setPasswordRepeatInput(e.target.value)}
          //textError={"Пароль слишком короткий333"}
          error={!passwordValidRepeat}
          required/>
      </form>
      <div className={style.signUp__buttonBox}>
        <ButtonBasic text={'Зарегистрироваться'} color={'primaryGreen'} type={'submit'} onClick={handleOnSubmit}
                     disabled={isSubmitDisabled || disableForm}/>
      </div>
    </section>
  )
}

export default SignUp