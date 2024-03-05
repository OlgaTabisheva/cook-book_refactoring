import style from './FullRecipe.module.scss'
import Foodstuff from "../../shared/Foodstuff/Foodstuff.jsx";
import ButtonCounter from "../../shared/Buttons/ButtonCounter/ButtonCounter.jsx";
import RecipeComposition from "../../widgets/RecipeComposition/RecipeComposition.jsx";
import {HomePage} from "../HomePage/HomePage.jsx";
import {useNavigate} from "react-router-dom";
import ButtonBack from "../../shared/Buttons/ButtonBack/ButtonBack.jsx";
import test from '../../assets/test.jpg'
import RecipePhotoBlock from "../../widgets/RecipePhotoBlock/RecipePhotoBlock.jsx";
import BoxClockTime from "../../shared/BoxClockTime/BoxClockTime.jsx";
import CommentsBox from "../../widgets/CommentsBox/CommentsBox.jsx";

function FullRecipe() {

  const navigate = useNavigate();


  function handleNavigate() {
    navigate(-1);
  }

  return (
    <div
      className={style.fullRecipe}>
      <ButtonBack onClick={handleNavigate}/>
      <div className={style.fullRecipe__titleContent}>
        <h3 className={style.fullRecipe__title}> Булочки синнабон с корицей и длинным длинным названием</h3>
        <BoxClockTime howLong={'более 2 часов'}/>
      </div>
      <div className={style.fullRecipe__box}>
        <RecipePhotoBlock/>
        <RecipeComposition/>
      </div>
<CommentsBox/>
    </div>
  )
}

export default FullRecipe
