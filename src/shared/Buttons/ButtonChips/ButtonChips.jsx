import style from './ButtonChips.module.scss'

function ButtonBasic({text, onClick}) {
  return (
    <button className={style.buttonChips} onClick={onClick}>
      {text}
    </button>
  )
}

export default ButtonBasic

