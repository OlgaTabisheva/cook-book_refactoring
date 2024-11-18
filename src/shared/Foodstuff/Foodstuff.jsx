import style from './Foodstuff.module.scss'

function Foodstuff({obj}) {
  return (
    <div
      className={style.foodstuff}>

      <div className={style.foodstuff__bottom2}>
        <div className={style.foodstuff__text}>{obj?.product}</div>
        <span className={style.foodstuff__bottom}></span>
        <span className={style.foodstuff__text2}>{obj?.count} {obj?.unit}</span>
      </div>

    </div>
  )
}

export default Foodstuff