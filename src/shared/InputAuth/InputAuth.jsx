import style from './InputAuth.module.scss'


function InputAuth({title, text}) {
  return (
    <div className={style.inputAuth}>

      <p className={style.inputAuth__text}>{title}</p>
      <input className={style.inputAuth__input} placeholder={text}/>
      <button className={style.inputAuth__buttonImg}>
        <img className={style.inputAuth__img}/>
      </button>

    </div>
  )
}

export default InputAuth
