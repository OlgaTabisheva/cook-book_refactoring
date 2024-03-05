import style from './ButtonLike.module.scss'


function ButtonLikeEmpty({handleClickLike, countLikes}) {
  return (
    <button className={style.buttonLikeEmpty} onClick={() => handleClickLike}>
      <div
        className={style.buttonLikeEmpty__heart}></div>
      <div className={style.buttonLikeEmpty__count}>{countLikes}</div>

    </button>
  )
}

export default ButtonLikeEmpty
