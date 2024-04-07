import style from './InputSearch.module.scss'
import {ReactComponent as Search} from '../../assets/search.svg';
import {ReactComponent as Close} from '../../assets/close.svg';
import {useState} from "react";
import {Link} from "react-router-dom";

function InputSearch({placeholder, onChange, id, name, type, value, searchValue,onClick}) {


  return (
    <div className={style.search}>
      <input className={style.search__input} placeholder={placeholder} onChange={onChange} id={id}
             name={name}
             type={type} value={value} defaultValue={searchValue} />
      <Search className={style.search__search}/>


      <button className={style.search__button} onClick={onClick}>
        Искать

      </button>

    </div>
  )
}

export default InputSearch
