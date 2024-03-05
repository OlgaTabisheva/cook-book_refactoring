import style from './AddRecipe.module.scss'
import HeaderMini from "../../widgets/HeaderMini/HeaderMini.jsx";
import InputAuth from "../../shared/InputAuth/InputAuth.jsx";
import cow from  './../../assets/test.jpg'


function Comments() {
  return (
    <section className={style.addRecipe}>
      <HeaderMini/>
      <div className={style.addRecipe__box}>
<h2 className={style.addRecipe__title}>Редактирование рецепта</h2>
      <InputAuth title={'Название рецепта'} text={'Булочки синабонн с корицей и сахарной пудрой'}/>
      <h3 className={style.addRecipe__subtitle}>Редактирование рецепта:</h3>
      <h3 className={style.addRecipe__subtitle}>Фото готового блюда:</h3>
        <div className={style.addRecipe__imgBox}>

        </div>
        <img src={cow} className={style.addRecipe__img}/>
      <h3 className={style.addRecipe__subtitle}>Длительность приготовления:</h3>
      <h3 className={style.addRecipe__subtitle}>Состав:</h3>
      </div>
    </section>
  )
}

export default Comments
