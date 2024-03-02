import style from './UserRecipes.module.scss'
import RecipeCardTest from "../../test/RecipeCardTest/RecipeCardTest.jsx";
import NoticeProfile from "../NoticeProfile/NoticeProfile.jsx";
import not from "../../assets/picDocument.svg";


function UserRecipes() {

  return (
    <section className={style.userRecipes}>
        <NoticeProfile text={'Поделитесь вашим рецептом с нашими пользователями'} src={not} title={'Вы еще не добавляли рецепты'} colorButton={'primaryGreen'} textButton={'Добавить рецепт'}/>
{/*<div className={style.userRecipes__box}>
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

export default UserRecipes