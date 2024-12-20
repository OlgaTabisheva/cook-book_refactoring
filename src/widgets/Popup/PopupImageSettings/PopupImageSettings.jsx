import style from "./PopupImageSettings.module.scss";
import {ReactComponent as ReplaceIcon} from '../../../assets/image.svg';
import {ReactComponent as CropIcon} from '../../../assets/rotation.svg';
import {ReactComponent as DeleteIcon} from '../../../assets/trash.svg';
import {useState} from "react";


function PopupImageSettings({
                              onClick,
                              popupDelImage,
                              setPopupDelImage,
                              image,
                              mainRecipeImage,
                              setDelImageFromStorage
                            }) {


  const units = [
    {full: <ReplaceIcon className={style.popupImageSettings__icon}/>, text: 'Заменить', id: 1},
    {full: <CropIcon className={style.popupImageSettings__icon}/>, text: 'Кадрировать', id: 2},
    {full: <DeleteIcon className={style.popupImageSettings__iconRed}/>, text: 'Удалить', id: 3},
  ]

  function handleOpenDelPopup(image) {
    setDelImageFromStorage(image)
    setPopupDelImage(!popupDelImage)
  }

  return (


    <button type={'button'} className={style.popupImageSettings}
            onClick={() => handleOpenDelPopup(image?.urlId || mainRecipeImage?.id)}>
      {units?.map((obj) => (
        <div className={style.popupImageSettings__button} key={obj.id}>
          <div> {obj.full}</div>
          <p className={style.popupImageSettings__text}>{obj.text}</p>
        </div>
      ))}
    </button>


  )

}

export default PopupImageSettings