import style from './ButtonChips.module.scss'
import {useState} from "react";

function ButtonBasic({ onClick, active, text, chosenText}) {





  return (
    <button className={text === chosenText.category ? style.buttonChips_active : style.buttonChips} onClick={onClick} type={'button'}>
      {text}
    </button>
  )
}
export default ButtonBasic

