import style from './InputAuth.module.scss'


function InputAuth({title, text}) {
  return (
    <div className={style.inputAuth} >

        <p className={style.inputAuth__text}>{title}</p>
        <input className={style.inputAuth__input} placeholder={text}/>


    </div>
  )
}

export default InputAuth
