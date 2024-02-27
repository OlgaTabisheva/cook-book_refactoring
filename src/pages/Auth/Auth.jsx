import style from './Auth.module.scss'
import Header from "../../widgets/Header/Header.jsx";
import HeaderMini from "../../widgets/HeaderMini/HeaderMini.jsx";
import ButtonRadioAuth from "../../shared/Buttons/ButtonRadioAuth/ButtonRadioAuth.jsx";
import InputAuth from "../../shared/InputAuth/InputAuth.jsx";
import ButtonBasic from "../../shared/Buttons/ButtonBasic/ButtonBasic.jsx";

function Auth() {

  return (
    <section className={style.auth}>
      <HeaderMini/>
      <div className={style.auth__content}>
        <div className={style.auth__contentText}>
          <h2 className={style.auth__title}>Войдите на сайт</h2>
          <p className={style.auth__description}>и ставьте лайки, комментируйте, и пишите рецепты </p>
        </div>
        <ButtonRadioAuth/>
        <div className={style.auth__box}>
          <InputAuth text={"Введите почту"} title={"Email:"}/>
          <InputAuth text={"Введите почту"} title={"Пароль:"}/>
        </div>
        <div className={style.auth__buttonBox}>
          <ButtonBasic text={'Войти'}/>
          <a className={style.auth__link}> Забыли пароль?</a>
        </div>
      </div>

    </section>
  )
}

export default Auth