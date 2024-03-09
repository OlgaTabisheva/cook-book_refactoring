import style from './ButtonUnits.module.scss'
import {ReactComponent as Arrow} from '../../../assets/arrow.svg';


function ButtonUnits({text, onClick}) {
  return (
    <button className={style.buttonUnits} onClick={onClick}>
      <p className={style.buttonUnits__text}>{text}</p>
      <Arrow className={style.buttonUnits__arrow}/>
    </button>
  )
}

export default ButtonUnits