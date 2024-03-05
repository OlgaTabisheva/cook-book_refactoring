import style from './AdditionalRecipes.module.scss'
import RecipeCardTest from "../../test/RecipeCardTest/RecipeCardTest.jsx";

function AdditionalRecipes() {
  return (
    <section
      className={style.additionalRecipes}>
      <h4 className={style.additionalRecipes__title}>На нашем сайте ещё много вкусняшек!</h4>
      <div className={style.additionalRecipes__box}>
        <RecipeCardTest/>
        <RecipeCardTest/>
        <RecipeCardTest/>

      </div>
    </section>
  )
}

export default AdditionalRecipes
