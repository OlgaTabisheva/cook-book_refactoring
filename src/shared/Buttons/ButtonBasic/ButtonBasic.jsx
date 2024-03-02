import style from './ButtonBasic.module.scss'

function ButtonBasic({text, onClick, disabled, color}) {
  return (
    <button
      className={
        color === 'primaryGreen' && style.buttonBasicM_primaryGreen ||
        color === 'primaryRed' && style.buttonBasicM_primaryRed ||
        color === 'secondaryGreen' && style.buttonBasicM_secondaryGreen ||
        color === 'secondaryRed' && style.buttonBasicM_secondaryRed ||
        color === 'tertiaryGreen' && style.buttonBasicM_tertiaryGreen ||
        color === 'tertiaryRed' && style.buttonBasicM_tertiaryRed}
      onClick={onClick ? onClick : null} disabled={disabled}>
      {text}
    </button>
  )
}

export default ButtonBasic

