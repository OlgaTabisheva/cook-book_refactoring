import style from './FavoritesRecipes.module.scss'

import NoticeProfile from "../NoticeProfile/NoticeProfile.jsx";
import not from '../../assets/picHeart.svg'
import RecipeCardTest from "../../test/RecipeCardTest/RecipeCardTest.jsx";

function FavoritesRecipes() {
  return (
    <section
      className={style.favoritesRecipes}>
        <NoticeProfile src={not} title={'Вы еще не сохраняли рецепты'} text={'Нажмите на сердечко и рецепт добавится в избранное. Если рецепт не добавился —перезагрузите страницу'} colorButton={'primaryGreen'} textButton={'Смотреть рецепты'}/>
  {/*    <div className={style.favoritesRecipes__box}>
      <RecipeCardTest/>
      <RecipeCardTest/>
      <RecipeCardTest/>
      <RecipeCardTest/>
      <RecipeCardTest/>
      <RecipeCardTest/>
      <RecipeCardTest/>
      <RecipeCardTest/>
      <RecipeCardTest/>
      <RecipeCardTest/>
      <RecipeCardTest/>
      <RecipeCardTest/>
      <RecipeCardTest/>
      <RecipeCardTest/>
      <RecipeCardTest/>
      <RecipeCardTest/>
      <RecipeCardTest/>
      <RecipeCardTest/>
      <RecipeCardTest/>
      <RecipeCardTest/>
      </div>*/}
    </section>
  )
}

export default FavoritesRecipes
