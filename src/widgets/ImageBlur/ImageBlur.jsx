import style from './ImageBlur.module.scss'
import ButtonPicture from "../../shared/Buttons/ButtonPicture/ButtonPicture.jsx";
import PopupImageSettings from "../Popup/PopupImageSettings/PopupImageSettings.jsx";
import {useState} from "react";



function ImageBlur({image}) {


  const [openSettingPopup, setOpenSettingPopup] = useState(false)


  console.log(openSettingPopup, 'openSettingPopup')
  return (
    <div className={style.imageBlur}>
<img className={style.imageBlur__top} src={image}/>
      <img className={style.imageBlur__blur} src={image}/>
      <div className={style.imageBlur__button}>
        <ButtonPicture size={'normalWhite'} value={'image'} onClick={()=>setOpenSettingPopup(!openSettingPopup)}/>
      </div>
      {openSettingPopup && <PopupImageSettings/>}

    </div>
  )
}

export default ImageBlur