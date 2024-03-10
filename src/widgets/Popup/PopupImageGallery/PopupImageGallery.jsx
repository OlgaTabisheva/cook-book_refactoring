import style from './PopupImageGallery.module.scss'
import ButtonPicture from "../../../shared/Buttons/ButtonPicture/ButtonPicture.jsx";
import ButtonBasic from "../../../shared/Buttons/ButtonBasic/ButtonBasic.jsx";


function PopupImageGallery() {
  return (
    <div className={style.popupImageGallery}>
<ButtonPicture size={'smallBlack'} value={'WhiteClose'}/>

    </div>
  )
}

export default PopupImageGallery