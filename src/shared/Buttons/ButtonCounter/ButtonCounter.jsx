import style from './ButtonCounter.module.scss'
import {ReactComponent as Piece} from '../../../assets/minus.svg';

function ButtonCounter({value, onClick, disabled}) {
  return (
    <button
      className={style.buttonCounter}
      onClick={onClick ? onClick : null} disabled={disabled}>

      <Piece className={style.buttonCounter__img}/>
    </button>
  )
}

export default ButtonCounter
