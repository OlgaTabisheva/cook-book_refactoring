import style from './ButtonChips.module.scss'

function ButtonBasic({text, onClick, active}) {
  return (
    <button className={active === 'active' ? style.buttonChips_active : style.buttonChips} onClick={onClick}>
      {text}
    </button>
  )
}

export default ButtonBasic

