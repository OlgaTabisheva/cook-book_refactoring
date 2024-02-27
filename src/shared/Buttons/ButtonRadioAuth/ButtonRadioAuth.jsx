import style from './ButtonRadioAuth.module.scss'
import {useState} from "react";


function ButtonRadioAuth({disabledButton,setDisabledButton}) {
  return (
    <section className={style.buttonRadioAuth}>

      <button className={style.buttonRadioAuth__button} onClick={() => setDisabledButton(!disabledButton)}
              disabled={!disabledButton}>Войти
      </button>
      <button className={style.buttonRadioAuth__button} onClick={() => setDisabledButton(!disabledButton)}
              disabled={disabledButton}>Зарегистрироваться
      </button>
    </section>
  )
}

export default ButtonRadioAuth
