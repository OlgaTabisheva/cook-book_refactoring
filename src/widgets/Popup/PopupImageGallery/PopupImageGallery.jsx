import style from './PopupImageGallery.module.scss'
import ButtonPicture from "../../../shared/Buttons/ButtonPicture/ButtonPicture.jsx";
import img from './../../../assets/test.jpg'

function PopupImageGallery() {
  return (
    <div className={style.popupImageGallery}>
<ButtonPicture size={'smallBlack'} value={'WhiteClose'}/>
<img className={style.popupImageGallery__img} src={img}/>
      <p className={style.popupImageGallery__text} >1/5</p>
    </div>
  )
}

export default PopupImageGallery