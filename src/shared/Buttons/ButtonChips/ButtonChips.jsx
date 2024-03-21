import style from './ButtonChips.module.scss'
import {useState} from "react";

function ButtonChips({ onClick, text, chosenText}) {

  return (
    <button className={(text === chosenText? style.buttonChips_active : style.buttonChips)} onClick={onClick} type={'button'}>
      {text}
    </button>
  )
}
export default ButtonChips

