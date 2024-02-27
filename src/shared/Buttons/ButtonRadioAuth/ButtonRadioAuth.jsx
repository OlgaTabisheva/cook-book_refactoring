import style from './ButtonRadioAuth.module.scss'
import {useState} from "react";


function ButtonRadioAuth() {
  const [disabledButton, setDisabledButton] = useState(true)
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
