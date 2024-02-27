import style from './InputAuth.module.scss'


function InputAuth({title, text, eye, password, setPassword}) {
  return (
    <div className={style.inputAuth}>

      <p className={style.inputAuth__text}>{title}</p>
      <input className={style.inputAuth__input} placeholder={text} type={password && "password"}/>
      {eye && <button className={style.inputAuth__buttonImg} onClick={()=>setPassword(!password)}>
        {<div className={ password ? style.inputAuth__img_active : style.inputAuth__img  }/>}
      </button>}

    </div>
  )
}

export default InputAuth
