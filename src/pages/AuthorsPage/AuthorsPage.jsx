import style from './AuthorsPage.module.scss'
import InputSearch from "../../shared/InputSearch/InputSearch.jsx";
import ButtonChips from "../../shared/Buttons/ButtonChips/ButtonChips.jsx";
import RecipeCard from "../../widgets/RecipeCard/RecipeCard.jsx";
import {useState} from "react";
import AuthorsCard from "../../widgets/AuthorsCard/AuthorsCard.jsx";


function AuthorsPage({

                        }) {



  return (
    <section className={style.authorsPage}>
      <InputSearch/>
      <div className={style.authorsPage__box}>
        <AuthorsCard/>
        <AuthorsCard/>
        <AuthorsCard/>
        <AuthorsCard/>
        <AuthorsCard/>
        <AuthorsCard/>
        <AuthorsCard/>
        <AuthorsCard/>
        <AuthorsCard/>
        <AuthorsCard/>
        <AuthorsCard/>
        <AuthorsCard/>
        <AuthorsCard/>
        <AuthorsCard/>
        <AuthorsCard/>
        <AuthorsCard/>
      </div>
    </section>
  )
}

export default AuthorsPage