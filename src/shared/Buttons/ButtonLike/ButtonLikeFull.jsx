import style from "./ButtonLike.module.scss";

function ButtonLikeFull({onClick, countLikes}) {
  return (
    <button className={style.buttonLikeFull} onClick={onClick}>
      <div
        className={style.buttonLikeFull__heart}></div>
      <div className={style.buttonLikeFull__count}>{countLikes}</div>
    </button>
  )
}

export default ButtonLikeFull
