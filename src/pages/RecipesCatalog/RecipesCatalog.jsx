import style from './RecipesCatalog.module.scss'
import InputSearch from "../../shared/InputSearch/InputSearch.jsx";


function RecipesCatalog() {

  return (
    <section className={style.catalog}>
<InputSearch/>
    </section>
  )
}

export default RecipesCatalog