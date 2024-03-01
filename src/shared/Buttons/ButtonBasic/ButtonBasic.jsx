import style from './ButtonBasic.module.scss'

function ButtonBasic({text,onClick,disabled, color}) {
  return (
    <button className={ color === 'primaryGreen' && style.buttonBasicM_primaryGreen || color === 'primaryRed' && style.buttonBasicM_primaryRed} onClick={onClick ? onClick : null} disabled={disabled}>
      {text}
    </button>
  )
}
export default ButtonBasic

