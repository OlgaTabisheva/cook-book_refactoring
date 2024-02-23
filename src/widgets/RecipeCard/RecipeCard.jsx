import style from './RecipeCard.module.scss'
import RecipeChips from "../../shared/RecipeChips/RecipeChips.jsx";
import recipeClock from "../../assets/clock 16.svg";
import recipeImage from "../../assets/test.jpg";
import ButtonLike from "../../shared/Buttons/ButtonLike/ButtonLikeEmpty.jsx";
import ButtonComments from "../../shared/Buttons/ButtonComments/ButtonComments.jsx";
import ButtonLikeFull from "../../shared/Buttons/ButtonLike/ButtonLikeFull.jsx";
import ButtonLikeEmpty from "../../shared/Buttons/ButtonLike/ButtonLikeEmpty.jsx";
import {useState} from "react";

function RecipeCard() {
  const [changeLike, setChangeLike] = useState(false)
  return (
    <section className={style.recipeCard}>
      <RecipeChips/>
      <img className={style.recipeCard__img} height="200px" width="352px"
           src={recipeImage} alt="recipeImg"/>
      <div className={style.recipeCard__textBox}>
      <h3 className={style.recipeCard__name}>Булочки синнабон с корицей с глазурью из сахара и белым шоколадом и
        восхитител</h3>
      <p className={style.recipeCard__text}>Марина Иванова</p>
      <div className={style.recipeCard__clock}>
        <img className={style.recipeCard__imgClock}
             src={recipeClock} alt="clock"/>
        <p className={style.recipeCard__text}>более 2 часов</p>
      </div>
      </div>
      <div className={style.recipeCard__box}>
        {changeLike === true ?
          <ButtonLikeFull setChangeLike={setChangeLike} changeLike={changeLike}/> :
          <ButtonLikeEmpty setChangeLike={setChangeLike} changeLike={changeLike}/>}
        <ButtonComments/>
      </div>

    </section>
  )
}

export default RecipeCard