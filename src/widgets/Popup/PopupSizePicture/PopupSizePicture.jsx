import style from './PopupSizePicture.module.scss'
import att from "./../../../assets/info.svg";
import cls from "./../../../assets/closeBrown.svg";


function PopupSizePicture({ setOpenSizeImagePopup, openSizeImagePopup}) {

  return (
    <div className={style.popupSizePicture}>
      <div className={style.popupSizePicture__cover}>
      <img alt={'attention'} src={att} className={style.popupSizePicture__img}/>
      <div className={style.popupSizePicture__text}>Фаил должен быть меньше 5 Мбайт</div>
      <button className={style.popupSizePicture__buttonClose} onClick={()=>setOpenSizeImagePopup(!openSizeImagePopup)}>
      <img alt={'close'} src={cls} className={style.popupSizePicture__close}/>
      </button>
      </div></div>
  )
}

export default PopupSizePicture