import style from './InputSearch.module.scss'
import {ReactComponent as Search} from '../../assets/search.svg';
import {ReactComponent as Close} from '../../assets/close.svg';
import {useState} from "react";

function InputSearch() {

  const [inputValue, setInputValue]=useState('')

  return (
    <div className={style.search} >
      <input className={style.search__input} placeholder={'введите название'} />
      <Search className={style.search__search}/>
      <Close className={style.search__close}/>
      <button className={style.search__button}>
        Искать
      </button>

    </div>
  )
}

export default InputSearch
