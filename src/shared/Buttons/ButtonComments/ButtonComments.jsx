import style from './ButtonComments.module.scss'

function ButtonComments({countComments}) {
  return (
    <button className={style.buttonComments}>
      <div
        className={style.buttonComments__comments}></div>
      <div className={style.buttonComments__count}>{countComments}</div>
    </button>
  )
}

export default ButtonComments