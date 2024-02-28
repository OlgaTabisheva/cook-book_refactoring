import style from './ButtonChips.module.scss'

function ButtonBasic({text}) {
  return (
    <button className={style.buttonChips}>
      {text}
    </button>
  )
}

export default ButtonBasic

