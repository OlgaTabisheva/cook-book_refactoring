import style from './CategoryList.module.scss'
import ButtonChips from "../../shared/Buttons/ButtonChips/ButtonChips.jsx";



function CategoryList({allCategories}) {
  return (
    <section className={style.categoryList}>

        <h3 className={style.categoryList__subtitle}>Категория блюда:</h3>
        <div className={style.categoryList__boxCategory}>
          {allCategories?.categories?.map((obj) => (
            <ButtonChips text={obj ? obj.category : ''}></ButtonChips>
          ))}
        </div>

    </section>
  )
}
export default CategoryList