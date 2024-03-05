import style from './SignUp.module.scss'
import InputAuth from "../../shared/InputAuth/InputAuth.jsx";
import ButtonBasic from "../../shared/Buttons/ButtonBasic/ButtonBasic.jsx";


function SignUp({password, setPassword}) {
  return (
    <section className={style.signUp}>
      <div className={style.signUp__box}>
        <InputAuth text={"Введите почту"} title={"Email:"} eye={false}/>
        <InputAuth text={"Введите пароль"} title={"Пароль:"} eye={true} password={password} setPassword={setPassword}/>
        <InputAuth text={"Введите пароль"} title={"Повторите пароль:"} eye={true} password={password}
                   setPassword={setPassword}/>
      </div>
      <div className={style.signUp__buttonBox}>
        <ButtonBasic text={'Зарегистрироваться'} color={'primaryGreen'}/>
      </div>
    </section>
  )
}

export default SignUp