import style from './AddRecipe.module.scss'
import HeaderMini from "../../widgets/HeaderMini/HeaderMini.jsx";
import InputAuth from "../../shared/InputAuth/InputAuth.jsx";
import ProductQuantity from "../../widgets/ProductQuantity/ProductQuantity.jsx";
import ImageBlur from "../../widgets/ImageBlur/ImageBlur.jsx";
import test from  './../../assets/test.jpg'
import ButtonChips from "../../shared/Buttons/ButtonChips/ButtonChips.jsx";


function AddRecipe({allCategories}) {
  return (
    <section className={style.addRecipe}>
      <HeaderMini/>
      <div className={style.addRecipe__box}>
        <div className={style.addRecipe__boxName}>
<h2 className={style.addRecipe__title}>Редактирование рецепта</h2>
      <InputAuth title={'Название рецепта'} text={'Булочки синабонн с корицей и сахарной пудрой'}/>
        </div>
      <h3 className={style.addRecipe__subtitle}>Категория блюда:</h3>
        <div className={style.addRecipe__boxCategory}>
          {allCategories?.categories?.map((obj) => (
            <ButtonChips text={obj ? obj.category : ''}></ButtonChips>
          ))}
          </div>
      <h3 className={style.addRecipe__subtitle}>Фото готового блюда:</h3>
        <ImageBlur image={test}/>
      <h3 className={style.addRecipe__subtitle}>Длительность приготовления:</h3>
      <h3 className={style.addRecipe__subtitle}>Состав:</h3>

      <ProductQuantity/>
      <ProductQuantity/>
      <ProductQuantity/>
      <ProductQuantity/>
      <ProductQuantity/>
      <ProductQuantity/>

      </div>

    </section>
  )
}

export default AddRecipe
