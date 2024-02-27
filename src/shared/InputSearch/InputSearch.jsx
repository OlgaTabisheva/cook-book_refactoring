import style from './InputSearch.module.scss'


function InputSearch() {
  return (
    <div className={style.search}>


      <input className={style.search__input} placeholder={'введите название'} />
     <button className={style.search__button} >

      </button>

    </div>
  )
}

export default InputSearch
