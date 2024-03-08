import style from './ImageBlur.module.scss'



function ImageBlur({image}) {
  return (
    <div className={style.imageBlur}>
<img className={style.imageBlur__top} src={image}/>
      <img className={style.imageBlur__blur} src={image}/>
<div className={style.imageBlur__solid}></div>
    </div>
  )
}

export default ImageBlur