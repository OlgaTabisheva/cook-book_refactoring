import style from './ButtonBasic.module.scss'

function ButtonBasic({text}) {
  return (
    <button className={style.buttonBasic}>
      {text}
    </button>
  )
}

export default ButtonBasic

