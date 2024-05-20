import style from './CategoryList.module.scss'
import ButtonChips from "../../shared/Buttons/ButtonChips/ButtonChips.jsx";
import {handleError} from "@apollo/client/link/http/parseAndCheckHttpResponse.js";
import {useEffect, useState} from "react";


function CategoryList({allCategories, chosenTextCategory, setChosenTextCategory}) {


  function handleCategory(obj) {
    setChosenTextCategory(obj)

  }

  return (
    <section className={style.categoryList}>

      <h3 className={style.categoryList__subtitle}>Категория блюда:</h3>
      <div className={style.categoryList__boxCategory} key={"boxCategory"}>
        {allCategories?.categories?.map((obj) => (
          <ButtonChips key={obj.number} text={obj ? obj.category : ''} onClick={() => handleCategory(obj)}
                       chosenText={chosenTextCategory}></ButtonChips>
        ))}
      </div>

    </section>
  )
}

export default CategoryList