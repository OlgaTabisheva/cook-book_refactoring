import style from './ImageBlur.module.scss'
import ButtonPicture from "../../shared/Buttons/ButtonPicture/ButtonPicture.jsx";



function ImageBlur({image}) {
  return (
    <div className={style.imageBlur}>
<img className={style.imageBlur__top} src={image}/>
      <img className={style.imageBlur__blur} src={image}/>
      <div className={style.imageBlur__button}>
        <ButtonPicture size={'normalWhite'} value={'image'}/>
      </div>

    </div>
  )
}

export default ImageBlur