import style from './ButtonComments.module.scss'

function ButtonComments({count}) {
  return (
    <button className={style.buttonComments}>
      <div
        className={style.buttonComments__comments}></div>
      <div className={style.buttonComments__count}>18</div>
    </button>
  )
}

export default ButtonComments