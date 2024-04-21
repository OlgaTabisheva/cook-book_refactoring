import style from './InputAuth.module.scss'
import {useForm} from "react-hook-form";
import {handleError} from "@apollo/client/link/http/parseAndCheckHttpResponse.js";
import {useEffect, useState} from "react";


function InputAuth({
                     title,
                     required,
                     eye,
                     password,
                     setPassword,
                     name,
                     id,
                     errorText,
                     placeholder,
                     error,
                     disabled,
                     onChange,
                     value,
                     ...props
                   }) {


  return (
    <div className={style.inputAuth} {...props}>

      <p className={style.inputAuth__text}>{title ? title : 'введите наименование поля'}</p>
      <input required={required} className={value !== '' ? style.inputAuth__input : style.inputAuth__input_padding}
             type={password && "password"} id={id}
             name={name} placeholder={placeholder} value={value} onChange={onChange} disabled={disabled}/>
      {eye && <button type={'button'} className={style.inputAuth__buttonImg} onClick={() => setPassword(!password)}>
        {<div className={password ? style.inputAuth__img_active : style.inputAuth__img}/>}
      </button>}
      <span className={error ? style.inputAuth__inputError : style.inputAuth__inputError_hidden}
            id="input-error">{value !== '' && errorText} </span>
    </div>
  )
}

export default InputAuth
