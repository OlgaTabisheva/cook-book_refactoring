import style from './SignUp.module.scss'
import InputAuth from "../../shared/InputAuth/InputAuth.jsx";
import ButtonBasic from "../../shared/Buttons/ButtonBasic/ButtonBasic.jsx";
import {useCallback, useState} from "react";
import {useSignUpEmailPassword} from "@nhost/react";
import {Navigate} from "react-router-dom";
import {useForm} from "react-hook-form"
import photo from './../../assets/userYelow.svg'
import {nhost} from "../../main.jsx";

function SignUp({password, setPassword}) {
  const [emailInput, setEmailInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [passwordRepeatInput, setPasswordRepeatInput] = useState('')
  const emailTest = /\S+@\S+\.\S+/;
  const { register, handleSubmit,formState: { errors } } = useForm({
    mode: "onBlur",
  });
  const onSubmit = (data, e) => console.log(data, e);
  const {signUpEmailPassword, isLoading, isSuccess, needsEmailVerification, isError, error} =
    useSignUpEmailPassword()
  const handleOnSubmit = (e) => {
    e.preventDefault()
    nhost.auth.signUp({
      email: emailInput,
      password: passwordInput
    })
  }
  if (isSuccess) {
    return <Navigate to="/user" replace={true}/>
  }
  return (
    <section className={style.signUp}>
      <form className={style.signUp__box} onSubmit={handleOnSubmit}>

        <InputAuth text={"Введите почту"} title={"Email:"} placeholder={"Email"}
                   eye={false} errorText={'ошибка'} name={'email'} register={register} value={emailInput} onChange={(e) => setEmailInput(e.target.value)} />
        <InputAuth text={"Введите пароль"} title={"Пароль:"}
                   eye={true} password={password} setPassword={setPassword} errorText={'ошибка'} name={'password'} value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} />
        <InputAuth text={"Введите пароль"} title={"Повторите пароль:"}
                   eye={true} password={password} setPassword={setPassword} errorText={'ошибка'}  name={'password2'} value={passwordRepeatInput} onChange={(e) => setPasswordRepeatInput(e.target.value)}  />



      </form>
      <div className={style.signUp__buttonBox}>
        <ButtonBasic text={'Зарегистрироваться'} color={'primaryGreen'} type={'submit'} onClick={handleOnSubmit} />
      </div>
    </section>
  )
}

export default SignUp