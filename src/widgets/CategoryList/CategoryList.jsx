import style from './CategoryList.module.scss'
import ButtonChips from "../../shared/Buttons/ButtonChips/ButtonChips.jsx";
import {handleError} from "@apollo/client/link/http/parseAndCheckHttpResponse.js";
import {useState} from "react";



function CategoryList({allCategories}) {
  const [chosenTextCategory, setChosenTextCategory] = useState('')


  function handleCategory(obj) {
    setChosenTextCategory(obj.category)
  }
  return (
    <section className={style.categoryList}>

        <h3 className={style.categoryList__subtitle}>Категория блюда:</h3>
        <div className={style.categoryList__boxCategory}>
          {allCategories?.categories?.map((obj) => (
            <ButtonChips text={obj ? obj.category : ''} onClick={()=>handleCategory(obj)} chosenText={chosenTextCategory}></ButtonChips>
          ))}
        </div>

    </section>
  )
}
export default CategoryList