import style from './ImageBlur.module.scss'
import ButtonPicture from "../../shared/Buttons/ButtonPicture/ButtonPicture.jsx";
import PopupImageSettings from "../Popup/PopupImageSettings/PopupImageSettings.jsx";
import {useEffect, useState} from "react";


function ImageBlur({
                     image,
                     handleDelPhoto,
                     popupDelImage,
                     setPopupDelImage,
                     setDelImageFromStorage,
                     openSettingPopup,
                     setOpenSettingPopup,
                     mainRecipeImage
                   }) {


  // console.log(image,'image')


  return (
    <div className={style.imageBlur}>
      <img className={style.imageBlur__top} src={image?.url}/>
      <img className={style.imageBlur__blur} src={image?.url}/>
      <div className={style.imageBlur__button}>
        <ButtonPicture size={'normalWhite'} value={'image'} onClick={() => setOpenSettingPopup(!openSettingPopup)}/>
      </div>
      {openSettingPopup && <PopupImageSettings image={image} setDelImageFromStorage={setDelImageFromStorage}
                                               mainRecipeImage={mainRecipeImage} popupDelImage={popupDelImage}
                                               setPopupDelImage={setPopupDelImage}/>}

    </div>
  )
}

export default ImageBlur