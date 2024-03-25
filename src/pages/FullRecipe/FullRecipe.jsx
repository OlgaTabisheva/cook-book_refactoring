import style from './FullRecipe.module.scss'
import Foodstuff from "../../shared/Foodstuff/Foodstuff.jsx";
import ButtonCounter from "../../shared/Buttons/ButtonCounter/ButtonCounter.jsx";
import RecipeComposition from "../../widgets/RecipeComposition/RecipeComposition.jsx";
import {HomePage} from "../HomePage/HomePage.jsx";
import {useNavigate, useParams} from "react-router-dom";
import ButtonBack from "../../shared/Buttons/ButtonBack/ButtonBack.jsx";
import test from '../../assets/test.jpg'
import RecipePhotoBlock from "../../widgets/RecipePhotoBlock/RecipePhotoBlock.jsx";
import BoxClockTime from "../../shared/BoxClockTime/BoxClockTime.jsx";
import CommentsBox from "../../widgets/CommentsBox/CommentsBox.jsx";
import {useEffect} from "react";

function FullRecipe({instantAddRecipe, setInstantAddRecipe, allCategories}) {
  const {id} = useParams();
  const navigate = useNavigate();
  const fullRecipe = instantAddRecipe?.recipes?.find(elem => elem.id === id);
//  const newData = JSON.parse(data).map(Object.values);
  function handleNavigate() {
    navigate(-1);
  }

  const recipeCompositionMap=JSON.parse(fullRecipe?.food)
  const recipeStepsMap = JSON.parse(fullRecipe?.steps)
  useEffect(()=>{
    console.log(fullRecipe, 'fullRecipe')
  }, [fullRecipe])
  return (
    <div
      className={style.fullRecipe}>
      <ButtonBack onClick={handleNavigate}/>
      <div className={style.fullRecipe__titleContent}>
        <h3 className={style.fullRecipe__title}> {fullRecipe?.name}</h3>
        <BoxClockTime howLong={fullRecipe?.duration?.duration}/>
      </div>
      <div className={style.fullRecipe__box}>
        <RecipePhotoBlock instantAddRecipe={instantAddRecipe} recipeStepsMap={recipeStepsMap}/>
        <RecipeComposition recipeCompositionMap={recipeCompositionMap}/>
      </div>
<CommentsBox/>
    </div>
  )
}

export default FullRecipe
