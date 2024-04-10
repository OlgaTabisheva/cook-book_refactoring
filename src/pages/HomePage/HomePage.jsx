import style from './HomePage.module.scss'
import React from "react";
import "react-multi-carousel/lib/styles.css";
import {useEffect, useState} from "react";
import PictureSection from "../../widgets/PictureSection/PictureSection.jsx";
import CarouselsBox from "../../widgets/CarouselsBox/CarouselsBox.jsx";
import {gql, useQuery} from "@apollo/client";


export const HomePage = ({
                           instantAddRecipe,
                           instantLikes,
                           setInstantLikes,
                           isAuthenticated,
                           setInstantAddRecipe, chosenCategory
                         }) => {

  const [instantNewRecipes, setInstantNewRecipes] = useState([])

  const GET_NEW_RECIPES = gql`
 query MyQuery {
  recipes(limit: 5, where: {}, order_by: {date: desc}) {
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
  recipes(limit: 5, where: {}, order_by: {date: desc}) {
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
  const newRecipes = useQuery(GET_NEW_RECIPES)?.data?.recipes

  useEffect(() => {
    setInstantNewRecipes(newRecipes)
  }, [newRecipes])


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
      {/*  <CarouselsBox  carouselTitle={"Самые популярные:"}
                      instantAddRecipe={instantAddRecipe}
                      instantLikes={instantLikes}
                      setInstantLikes={setInstantLikes}
                      isAuthenticated={isAuthenticated}
                      setInstantAddRecipe={setInstantAddRecipe}
                      newRecipes={newRecipes}/>
        <CarouselsBox  carouselTitle={"Обсуждаемые:"}
                      instantAddRecipe={instantAddRecipe}
                      instantLikes={instantLikes}
                      setInstantLikes={setInstantLikes}
                      isAuthenticated={isAuthenticated}
                      setInstantAddRecipe={setInstantAddRecipe}
                      newRecipes={newRecipes}/>*/}

      </div>
    </section>
  );
}