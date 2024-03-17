import style from './ButtonLike.module.scss'


function ButtonLikeEmpty({onClick, countLikes}) {
  return (
    <button className={style.buttonLikeEmpty} onClick={onClick}>
      <div
        className={style.buttonLikeEmpty__heart}></div>
      <div className={style.buttonLikeEmpty__count}>{countLikes}</div>

    </button>
  )
}

export default ButtonLikeEmpty
