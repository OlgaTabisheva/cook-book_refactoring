import style from './ButtonImgOpenGallery.module.scss'
import test from "../../../assets/test.jpg";

function ButtonImgOpenGallery({onClick, disabled, Imagebutton}) {
  return (
    <button
      className={style.buttonImgOpenGallery}
      onClick={onClick ? onClick : null} disabled={disabled}>
      <img className={style.buttonImgOpenGallery__img} src={Imagebutton} alt={'photo'}/>
      <p className={style.buttonImgOpenGallery__text}>+6</p>

    </button>
  )
}

export default ButtonImgOpenGallery
