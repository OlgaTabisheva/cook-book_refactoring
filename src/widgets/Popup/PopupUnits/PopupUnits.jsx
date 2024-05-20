import style from './PopupUnits.module.scss'
import {ReactComponent as Check} from '../../../assets/check.svg';

const units = [
  {full: 'Килограмм', cut: 'Кг.', id: 1},
  {full: 'Грамм', cut: 'Гр.', id: 2},
  {full: 'Милилитры', cut: 'Мл.', id: 3},
  {full: 'Штука', cut: 'Шт.', id: 4},
  {full: 'Столовая ложка', cut: 'Ст. л.', id: 5},
  {full: 'Чайная ложка', cut: 'Ч. л.', id: 6},
  {full: 'По вкусу', cut: 'По вкусу', id: 7}]


function PopupUnits({isOpen, setProductInfo, setIsOpen, productInfo, numberId}) {


  function handleSetProductUnit(obj) {
    setProductInfo({number: numberId, count: productInfo.count, unit: obj, product: productInfo.product})

    setIsOpen(!isOpen)

  }

  return (
    <div className={isOpen === true ? style.popupUnits_hidden : style.popupUnits}>
      {units?.map((obj) => (
        <button type={'button'} className={style.popupUnits__box} onClick={() => handleSetProductUnit(obj.cut)}
                key={obj.id}>
          <p className={style.popupUnits__text}> {obj.full}</p>
          {'obj' === productInfo.unit && <Check className={style.popupUnits__check}/>}

        </button>)
      )}
    </div>
  )
}

export default PopupUnits