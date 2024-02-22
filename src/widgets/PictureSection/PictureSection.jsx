import style from './PictureSection.module.scss'
import ButtonBasic from "../../shared/Buttons/ButtonBasic/ButtonBasic.jsx";

function PictureSection() {
  return (
    <section className={style.pictureSection}>

      <div className={style.pictureSection__box}>
      <h2 className={style.pictureSection__title}> Делимся вкусными рецептами средиземноморской и сербской кухни</h2>
      <p className={style.pictureSection__text}>Помогаем собрать рецепты в одном месте. Все блюда опробованы и составляют кулинарную книгу наших авторов</p>
      <ButtonBasic text={'Добавить рецепт'}/>
      </div>
    </section>
  )
}

export default PictureSection