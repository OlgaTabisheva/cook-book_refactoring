import style from './SignIn.module.scss'
import InputAuth from "../../shared/InputAuth/InputAuth.jsx";
import ButtonBasic from "../../shared/Buttons/ButtonBasic/ButtonBasic.jsx";


function SignIn({password, setPassword}) {
  return (
    <section className={style.signIn}>
      <div className={style.signIn__box}>
        <InputAuth text={"Введите почту"} title={"Email:"} eye={false} />
        <InputAuth text={"Введите пароль"} title={"Пароль:"} eye={true} password={password} setPassword={setPassword}/>
      </div>
      <div className={style.signIn__buttonBox}>
        <ButtonBasic text={'Войти'} color={'primaryGreen'}/>
        <a className={style.signIn__link}> Забыли пароль?</a>
      </div>
    </section>
  )
}

export default SignIn