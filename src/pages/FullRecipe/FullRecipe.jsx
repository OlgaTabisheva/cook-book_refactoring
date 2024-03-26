import style from './FullRecipe.module.scss'
import RecipeComposition from "../../widgets/RecipeComposition/RecipeComposition.jsx";
import {useNavigate, useParams} from "react-router-dom";
import ButtonBack from "../../shared/Buttons/ButtonBack/ButtonBack.jsx";
import RecipePhotoBlock from "../../widgets/RecipePhotoBlock/RecipePhotoBlock.jsx";
import BoxClockTime from "../../shared/BoxClockTime/BoxClockTime.jsx";
import CommentsBox from "../../widgets/CommentsBox/CommentsBox.jsx";
import {useEffect, useState} from "react";

function FullRecipe({instantAddRecipe}) {
  const {id} = useParams();
  const navigate = useNavigate();
  const fullRecipe = instantAddRecipe?.recipes?.find(elem => elem.id === id);
  const [recipeStepsMap, setRecipeStepsMap] = useState([])
  const [recipeCompositionMap, setRecipeCompositionMap] = useState([])

  function handleNavigate() {
    navigate(-1);
  }

  useEffect(() => {
    if (fullRecipe?.steps.length>0){
      setRecipeStepsMap(JSON.parse(fullRecipe?.steps))
    }
    if (fullRecipe?.food.length>0){
      setRecipeCompositionMap(JSON.parse(fullRecipe?.food))
    }
  }, [fullRecipe])


  return (
    <div
      className={style.fullRecipe}>
      <ButtonBack onClick={handleNavigate}/>
      <div className={style.fullRecipe__titleContent}>
        <h3 className={style.fullRecipe__title}> {fullRecipe?.name}</h3>
        <BoxClockTime
          howLong={fullRecipe?.duration?.duration ? fullRecipe?.duration?.duration : 'длительность не задана'}/>
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
