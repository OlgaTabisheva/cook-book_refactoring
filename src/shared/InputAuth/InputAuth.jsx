import style from './InputAuth.module.scss'
import {useForm} from "react-hook-form";


function InputAuth({title, text, eye, password, setPassword,name,id, errorText, placeholder,error, disabled,onChange,value, ...props}) {


  return (
    <div className={style.inputAuth } {...props}>

      <p className={style.inputAuth__text}>{title}</p>
      <input className={style.inputAuth__input} type={password && "password"} id={id} name={name} placeholder={placeholder} value={value} onChange={onChange}/>
   {eye && <button className={style.inputAuth__buttonImg} onClick={() => setPassword(!password)}>
        {<div className={password ?  style.inputAuth__img_active : style.inputAuth__img }/>}
      </button>}
      <span className={error ? style.inputAuth__inputError : style.inputAuth__inputError_hidden}  id="input-error">{errorText} </span>
    </div>
  )
}

export default InputAuth
