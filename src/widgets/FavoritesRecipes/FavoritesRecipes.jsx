import style from './FavoritesRecipes.module.scss'

import NoticeProfile from "../NoticeProfile/NoticeProfile.jsx";
import not from '../../assets/picHeart.svg'
import RecipeCardTest from "../../test/RecipeCardTest/RecipeCardTest.jsx";
import {gql, useQuery} from "@apollo/client";
import {useUserData} from "@nhost/react";
import {useEffect} from "react";
import RecipeCard from "../RecipeCard/RecipeCard.jsx";

function FavoritesRecipes({instantLikes, setInstantLikes, likesFromServer}) {

  const user = useUserData()


  const GET_LIKES_RECIPES = gql`
query MyQuery {
  likes(order_by: {}, where: {userId: {_eq: "${user.id}"}}) {
    recipe {
          category {
      category
    }
   duration {
      duration
    }
      id
      date
      name
      food
      description
      photo
      steps
    }
  }
}`

  const GetLikesRecipesFromServer = useQuery(GET_LIKES_RECIPES)?.data

  useEffect(() => {
    setInstantLikes(likesFromServer)
  }, [likesFromServer])

  return (
    <section
      className={style.favoritesRecipes}>
      {GetLikesRecipesFromServer?.length !== 0 ?
        <div className={style.favoritesRecipes__box}>

          {GetLikesRecipesFromServer?.likes?.map((obj) => (
            <RecipeCard isBtnEdit={false} isBtnComments={false}
                        key={obj?.recipe.id} {...obj?.recipe} instantLikes={instantLikes}
                        setInstantLikes={setInstantLikes}/>))}</div>
        : <NoticeProfile src={not} title={'Вы еще не сохраняли рецепты'}
                         text={'Нажмите на сердечко и рецепт добавится в избранное. Если рецепт не добавился —перезагрузите страницу'}
                         colorButton={'primaryGreen'} textButton={'Смотреть рецепты'}/>}
    </section>
  )
}

export default FavoritesRecipes
