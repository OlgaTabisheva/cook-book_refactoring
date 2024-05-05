import style from './FullRecipe.module.scss'
import RecipeComposition from "../../widgets/RecipeComposition/RecipeComposition.jsx";
import {useNavigate, useParams} from "react-router-dom";
import ButtonBack from "../../shared/Buttons/ButtonBack/ButtonBack.jsx";
import RecipePhotoBlock from "../../widgets/RecipePhotoBlock/RecipePhotoBlock.jsx";
import BoxClockTime from "../../shared/BoxClockTime/BoxClockTime.jsx";
import CommentsBox from "../../widgets/CommentsBox/CommentsBox.jsx";
import {useEffect, useState} from "react";
import {gql, useQuery} from "@apollo/client";

function FullRecipe({instantAddRecipe,isAuthenticated, setInstantLikesComments, instantLikesComments, instantLikes }) {
  const {id} = useParams();
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
      avatarUrl
    }
  }
}
`

  const res = useQuery(GET_COMMENTS)
  const CommentsFromServer = res?.data?.comments
  useEffect(() => {

    setInstantComments(CommentsFromServer)
  }, [CommentsFromServer])



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
        <ButtonBack />
        <div className={style.fullRecipe__titleContent}>
          <h3 className={style.fullRecipe__title}> {fullRecipe?.name}</h3>

          <BoxClockTime
            howLong={fullRecipe?.duration?.duration ? fullRecipe?.duration?.duration : 'длительность не задана'}/>
        </div>



        <div className={style.fullRecipe__box}>
          <RecipePhotoBlock recipeCompositionMap={recipeCompositionMap} instantAddRecipe={instantAddRecipe} recipeStepsMap={recipeStepsMap} instantLikes={instantLikes}/>

        </div>

        <CommentsBox       isAuthenticated={isAuthenticated}
                           instantComments={instantComments}
                           setInstantComments={setInstantComments}
                           instantLikesComments={instantLikesComments}
                           setInstantLikesComments={setInstantLikesComments}
        />

      </div>
      <div className={style.fullRecipe__composition_desktop} >
      <RecipeComposition recipeCompositionMap={recipeCompositionMap}/>
      </div>
    </div>

  )
}

export default FullRecipe
