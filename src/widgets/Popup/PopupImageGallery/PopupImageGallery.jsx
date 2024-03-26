import style from './PopupImageGallery.module.scss'
import ButtonPicture from "../../../shared/Buttons/ButtonPicture/ButtonPicture.jsx";
import img from './../../../assets/test.jpg'

function PopupImageGallery({open,setOpenImagePopup }) {
  return (



    <div className={open===true ? style.popupImageGallery : style.popupImageGallery__deactivate}>
      <div className={style.popupImageGallery__wrapper}>
        <div className={style.popupImageGallery__button}> <ButtonPicture size={'smallInherit'} value={'WhiteClose'} onClick={()=>{setOpenImagePopup(!open)}}/></div>

     <img className={style.popupImageGallery__img} src={img}/>
        <button className={style.popupImageGallery__left}>лево</button>
        <button className={style.popupImageGallery__right}>право</button>
      <p className={style.popupImageGallery__text} >1/5</p>
    </div>
    </div>
  )
}

export default PopupImageGallery