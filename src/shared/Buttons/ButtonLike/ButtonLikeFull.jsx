import style from "./ButtonLike.module.scss";

function ButtonLikeFull({setChangeLike, changeLike}) {
  return (
    <button className={style.buttonLikeFull} onClick={() => setChangeLike(!changeLike)}>
      <div
        className={style.buttonLikeFull__heart}></div>
      <div className={style.buttonLikeFull__count}>6</div>
    </button>
  )
}

export default ButtonLikeFull
