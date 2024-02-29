import style from './HomePage.module.scss'
import Carousel from "react-multi-carousel";
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
                           setInstantAddRecipe,chosenCategory
                         }) => {

const [instantNewRecipes, setInstantNewRecipes] = useState([])

  const GET_NEW_RECIPES = gql`
 query MyQuery {
  recipes(limit: 8, where: {}, order_by: {date: desc}) {
    recipes_category
    photo
    name
    long
    id
    food
    authorId
    date
  }
}`
  const newRecipes = useQuery(GET_NEW_RECIPES)?.data?.recipes

  useEffect(()=>{
    setInstantNewRecipes(newRecipes)
  },[newRecipes])

 console.log(instantNewRecipes, 'newRecipes')
  return (
    <section className={style.home}>
      <PictureSection/>
      <CarouselsBox instantNewRecipes={instantNewRecipes} title={"Новые:"} instantAddRecipe={instantAddRecipe}
                    instantLikes={instantLikes}
                    setInstantLikes={setInstantLikes}
                    isAuthenticated={isAuthenticated}
                    setInstantAddRecipe={setInstantAddRecipe}
                    newRecipes={newRecipes}/>

    </section>
  );
}