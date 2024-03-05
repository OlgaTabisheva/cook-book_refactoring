import style from './Foodstuff.module.scss'

function Foodstuff({}) {
  return (
    <div
      className={style.foodstuff}>

      <div className={style.foodstuff__bottom2}>
        <div className={style.foodstuff__text}>Мука</div>
        <span className={style.foodstuff__bottom}></span>
        <span className={style.foodstuff__text2}>500г</span>
      </div>

    </div>
  )
}

export default Foodstuff