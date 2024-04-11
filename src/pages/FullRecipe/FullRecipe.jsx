import style from './FullRecipe.module.scss'
import RecipeComposition from "../../widgets/RecipeComposition/RecipeComposition.jsx";
import {useNavigate, useParams} from "react-router-dom";
import ButtonBack from "../../shared/Buttons/ButtonBack/ButtonBack.jsx";
import RecipePhotoBlock from "../../widgets/RecipePhotoBlock/RecipePhotoBlock.jsx";
import BoxClockTime from "../../shared/BoxClockTime/BoxClockTime.jsx";
import CommentsBox from "../../widgets/CommentsBox/CommentsBox.jsx";
import {useEffect, useState} from "react";
import {gql, useQuery} from "@apollo/client";

function FullRecipe({instantAddRecipe,isAuthenticated, setInstantLikesComments, instantLikesComments }) {
  const {id} = useParams();
  const navigate = useNavigate();
  const fullRecipe = instantAddRecipe?.recipes?.find(elem => elem.id === id);
  const [recipeStepsMap, setRecipeStepsMap] = useState([])
  const [recipeCompositionMap, setRecipeCompositionMap] = useState([])
  const [instantComments, setInstantComments] = useState([])
  const GET_COMMENTS = gql`
query MyQuery {
  comments(where: {recipe: {id: {_eq: "${id}"}}}) {
    date
    text
      name
    user {
      displayName
      id
    }
  }
}
`

  const res = useQuery(GET_COMMENTS)
  const CommentsFromServer = res?.data?.comments
  useEffect(() => {

    setInstantComments(CommentsFromServer)
  }, [CommentsFromServer])

  function handleNavigate() {
    navigate(-1);
  }

  useEffect(() => {
    if (fullRecipe?.steps.length > 0) {
      setRecipeStepsMap(JSON.parse(fullRecipe?.steps))
    }
    if (fullRecipe?.food.length > 0) {
      setRecipeCompositionMap(JSON.parse(fullRecipe?.food))
    }
  }, [fullRecipe])


  return (
    <div className={style.fullRecipe}>
      <div className={style.fullRecipe__cover}>
        <ButtonBack onClick={handleNavigate}/>
        <div className={style.fullRecipe__titleContent}>
          <h3 className={style.fullRecipe__title}> {fullRecipe?.name}</h3>
          <BoxClockTime
            howLong={fullRecipe?.duration?.duration ? fullRecipe?.duration?.duration : 'длительность не задана'}/>
        </div>
        <div className={style.fullRecipe__box}>
          <RecipePhotoBlock instantAddRecipe={instantAddRecipe} recipeStepsMap={recipeStepsMap}/>

        </div>
        <CommentsBox       isAuthenticated={isAuthenticated}
                           instantComments={instantComments}
                           setInstantComments={setInstantComments}
                           instantLikesComments={instantLikesComments}
                           setInstantLikesComments={setInstantLikesComments}
        />

      </div>
      <RecipeComposition recipeCompositionMap={recipeCompositionMap}/>
    </div>
  )
}

export default FullRecipe
