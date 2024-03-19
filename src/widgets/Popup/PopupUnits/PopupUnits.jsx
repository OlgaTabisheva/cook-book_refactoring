import style from './PopupUnits.module.scss'
import {ReactComponent as Check} from '../../../assets/check.svg';

const units = [
  {full: 'Килограмм', cut: 'Кг.'},
  {full: 'Грамм', cut: 'Гр.'},
  {full: 'Милилитры', cut: 'Мл.'},
  {full: 'Штука', cut: 'Шт.'},
  {full: 'Столовая ложка', cut: 'Ст. л.'},
  {full: 'Чайная ложка', cut: 'Ч. л.'},
  {full: 'По вкусу', cut: 'По вкусу'},]


function PopupUnits({isOpen, setProductUnit, productUnit, setIsOpen}) {


  function handleSetProductUnit(obj) {
    setProductUnit(obj)
    setIsOpen(!isOpen)

  }

  return (
    <button className={isOpen === true ? style.popupUnits_hidden : style.popupUnits}>
      {units?.map((obj) => (
        <button className={style.popupUnits__box} onClick={() => handleSetProductUnit(obj.cut)}>
          <p className={style.popupUnits__text}> {obj.full}</p>
          {'obj' === productUnit && <Check className={style.popupUnits__check}/>}

        </button>
      ))}
    </button>
  )
}

export default PopupUnits