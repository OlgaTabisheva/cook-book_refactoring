import style from "./CategoryCard.module.scss";
import ButtonBasic from "../../shared/Buttons/ButtonBasic/ButtonBasic.jsx";


function CategoryCard(obj) {
  return (
    <section
      className={style.categoryCard}>
      <div className={style.categoryCard__box}>
        <h3 className={style.categoryCard__title}>{obj?.category}</h3>
        <p className={style.categoryCard__text}>16 рецептов</p>
      </div>
      <ButtonBasic text={'Удалить'} color={'secondaryRed'}/>
    </section>
  )
}

export default CategoryCard
