import style from './ButtonLike.module.scss'


function ButtonLikeEmpty({setChangeLike, changeLike}) {
  return (
    <button className={style.buttonLikeEmpty} onClick={() => setChangeLike(!changeLike)}>
      <div
        className={style.buttonLikeEmpty__heart}></div>
      <div className={style.buttonLikeEmpty__count}>6</div>

    </button>
  )
}

export default ButtonLikeEmpty
