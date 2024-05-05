import style from './HomePage.module.scss'
import React from "react";
import "react-multi-carousel/lib/styles.css";
import {useEffect, useState} from "react";
import PictureSection from "../../widgets/PictureSection/PictureSection.jsx";
import CarouselsBox from "../../widgets/CarouselsBox/CarouselsBox.jsx";
import {gql, useQuery} from "@apollo/client";
import PopupMenu from "../../widgets/Popup/PopupMenu/PopupMenu.jsx";


export const HomePage = ({
                           instantAddRecipe,
                           instantLikes,
                           setInstantLikes,
                           isAuthenticated,
                           setInstantAddRecipe,
                         }) => {

  const [instantNewRecipes, setInstantNewRecipes] = useState([])
  const [instantTheMostCommentsRecipes, setInstantTheMostCommentsRecipes] = useState([])
  const [instantTheMostPopularRecipes, setInstantTheMostPopularRecipes] = useState([])

  const GET_NEW_RECIPES = gql`
 query MyQuery {
  recipes(limit: 5, where: {publish: {_eq: true}}, order_by: {date: desc}) {
      category {
      category
    }
   duration {
      duration
    }
    photo
    name
    id
    food
    authorId
    date
  }
}`
  const GET_POPULAR_RECIPES = gql`
query MyQuery {
  recipes(order_by: {likes_aggregate: {max: {}, min: {}, count: desc}}, limit: 5, where: {publish: {_eq: true}}) {
    category {
      category
    }
    duration {
      duration
    }
    photo
    name
    id
    food
    authorId
    date
  }
}`

  const GET_MOST_COMMENT_RECIPES = gql`
query MyQuery {
  recipes(where: {publish: {_eq: true}}, order_by: {comments_aggregate: {count: desc}}, limit: 5 ) {
    category {
      category
    }
    duration {
      duration
    }
    photo
    name
    id
    food
    authorId
    date
  }
}
  `

  const newRecipes = useQuery(GET_NEW_RECIPES)?.data?.recipes
  const theMostPopularRecipes = useQuery(GET_POPULAR_RECIPES)?.data?.recipes
  const theMostCommentsRecipes = useQuery(GET_MOST_COMMENT_RECIPES)?.data?.recipes

  useEffect(() => {
    setInstantNewRecipes(newRecipes)
  }, [newRecipes])
  useEffect(() => {
    setInstantTheMostCommentsRecipes(theMostCommentsRecipes)
  }, [theMostCommentsRecipes])

  useEffect(() => {
    setInstantTheMostPopularRecipes(theMostPopularRecipes)
  }, [theMostPopularRecipes])

  return (
    <section className={style.home}>
      <PictureSection/>
      <div className={style.home__box}>
        <CarouselsBox instantNewRecipes={instantNewRecipes} carouselTitle={"Новые:"} instantAddRecipe={instantAddRecipe}
                      instantLikes={instantLikes}
                      setInstantLikes={setInstantLikes}
                      isAuthenticated={isAuthenticated}
                      setInstantAddRecipe={setInstantAddRecipe}
                      newRecipes={newRecipes}/>
        <CarouselsBox carouselTitle={"Самые популярные:"}
                      instantNewRecipes={instantTheMostPopularRecipes}
                      instantAddRecipe={instantAddRecipe}
                      instantLikes={instantLikes}
                      setInstantLikes={setInstantLikes}
                      isAuthenticated={isAuthenticated}
                      setInstantAddRecipe={setInstantAddRecipe}
                      newRecipes={newRecipes}/>
        <CarouselsBox carouselTitle={"Обсуждаемые:"}
                      instantNewRecipes={instantTheMostCommentsRecipes}
                      instantAddRecipe={instantAddRecipe}
                      instantLikes={instantLikes}
                      setInstantLikes={setInstantLikes}
                      isAuthenticated={isAuthenticated}
                      setInstantAddRecipe={setInstantAddRecipe}
                      newRecipes={newRecipes}/>

      </div>

    </section>
  );
}