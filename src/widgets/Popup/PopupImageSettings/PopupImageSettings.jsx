import style from "../PopupUnits/PopupUnits.module.scss";


function PopupImageSettings({isOpen, setProductInfo, setIsOpen, productInfo, numberId}) {

  const units = [
    {full: 'Килограмм', text: 'Заменить', id:1},
    {full: 'Грамм', text: 'Кадрировать.', id:2},
    {full: 'Милилитры', text: 'Удалить.', id:3},
]
  function handleSetSettingsImage(obj) {
    setProductInfo({number: numberId,count:productInfo.count, unit:obj, product : productInfo.product})

    setIsOpen(!isOpen)

  }

  return (
    <button className={isOpen === true ? style.popupUnits_hidden : style.popupUnits}>
      {units?.map((obj) => (
        <button className={style.popupUnits__box} onClick={() => handleSetSettingsImage(obj.cut)} key={obj.id}>
          <p className={style.popupUnits__text}> {obj.full}</p>
          {'obj' === productInfo.unit}

        </button>)
      )}
    </button>
  )
}

export default PopupImageSettings