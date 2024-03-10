import style from './AddRecipeStep1.module.scss'
import HeaderMini from "../../widgets/HeaderMini/HeaderMini.jsx";
import InputAuth from "../../shared/InputAuth/InputAuth.jsx";
import CategoryList from "../../widgets/CategoryList/CategoryList.jsx";
import ButtonBasic from "../../shared/Buttons/ButtonBasic/ButtonBasic.jsx";

function AddRecipeStep1({allCategories}) {
  return (
    <div className={style.addRecipeStep1}>
      <HeaderMini color={'SandColorful10'}/>
<div className={style.addRecipeStep1__box}>
  <h3 className={style.addRecipeStep1__title}>Создать рецепт</h3>
  <InputAuth title={'Название рецепта'} text={'Введите текст'}/>
  <CategoryList allCategories={allCategories}/>
  <ButtonBasic color={'primaryGreen'} text={'Далее'}/>
</div>
    </div>
  )
}

export default AddRecipeStep1