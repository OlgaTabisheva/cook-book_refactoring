import style from './RecipeChips.module.scss'

function RecipeChips({text}) {
  return (
    <section className={style.recipeChips}>
      {text}
    </section>
  )
}

export default RecipeChips