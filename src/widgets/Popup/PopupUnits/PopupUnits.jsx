import style from './PopupUnits.module.scss'
import {ReactComponent as Check} from '../../../assets/check.svg';

const units = ['Килограмм', 'Грамм', 'Милилитры', 'Штука', 'Столовая ложка', 'Чайная ложка', 'По вкусу', 'active']


function PopupUnits({isOpen}) {
  return (
    <button className={isOpen === true ? style.popupUnits_hidden : style.popupUnits}>
      {units?.map((obj) => (
        <div className={style.popupUnits__box}>
          <p className={style.popupUnits__text}> {obj}</p>
          {obj === 'active' && <Check className={style.popupUnits__check}/>}

        </div>
      ))}
    </button>
  )
}

export default PopupUnits