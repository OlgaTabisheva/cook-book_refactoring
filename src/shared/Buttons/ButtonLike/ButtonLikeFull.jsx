import style from "./ButtonLike.module.scss";

function ButtonLikeFull({handleClickLike, countLikes}) {
  return (
    <button className={style.buttonLikeFull} onClick={handleClickLike}>
      <div
        className={style.buttonLikeFull__heart}></div>
      <div className={style.buttonLikeFull__count}>{countLikes}</div>
    </button>
  )
}

export default ButtonLikeFull
