import style from './ButtonBack.module.scss'
import {ReactComponent as Back} from '../../../assets/Back.svg';

function ButtonBack({onClick, disabled}) {
  return (
    <button
      className={style.buttonBack}
      onClick={onClick ? onClick : null} disabled={disabled}>
      <Back className={style.buttonBack__back}/>
      Назад
    </button>
  )
}

export default ButtonBack