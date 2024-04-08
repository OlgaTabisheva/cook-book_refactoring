import style from './UserRecipes.module.scss'
import RecipeCardTest from "../../test/RecipeCardTest/RecipeCardTest.jsx";
import NoticeProfile from "../NoticeProfile/NoticeProfile.jsx";
import not from "../../assets/picDocument.svg";
import {useAuthenticated, useUserData} from "@nhost/react";
import {gql, useQuery} from "@apollo/client";
import RecipeCard from "../RecipeCard/RecipeCard.jsx";


function UserRecipes() {

  const user = useUserData()
  const defaultRole = user?.defaultRole?.includes('AdminRecipes')
  const isAuthenticated = useAuthenticated()
  const GET_RECIPES_BY_AUTHOR = gql`
query MyQuery {
  recipes(where: {authorId: {_eq: "${user.id}"}}) {
    photo
    name
    long
    id
    food
    description
    date
        category {
      category
    }
   duration {
      duration
    }
  }
}`

  const GetRecipesByAuthorFromServer = useQuery(GET_RECIPES_BY_AUTHOR)?.data


  console.log(GetRecipesByAuthorFromServer, 'GetRecipesByAuthorFromServer')
  return (
    <section className={style.userRecipes}>

      {GetRecipesByAuthorFromServer?.recipes?.length !== 0 ?
          <div className={style.userRecipes__box}>
            {GetRecipesByAuthorFromServer?.recipes.map((obj) => (
              <RecipeCard
                key={obj.id} {...obj} isBtnLike={false} isBtnComments={false}/>
            ))
            } </div> :<NoticeProfile text={'Поделитесь вашим рецептом с нашими пользователями'} src={not}
                                     title={'Вы еще не добавляли рецепты'} colorButton={'primaryGreen'} textButton={'Добавить рецепт'}/>}



    </section>
  )
}

export default UserRecipes