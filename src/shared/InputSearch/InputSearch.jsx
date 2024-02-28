import style from './InputSearch.module.scss'


function InputSearch() {
  return (
    <div className={style.search}>


      <input className={style.search__input} placeholder={'введите название'} />
      <div className={style.search__img} />
     <button className={style.search__button} >
Искать
      </button>

    </div>
  )
}

export default InputSearch
