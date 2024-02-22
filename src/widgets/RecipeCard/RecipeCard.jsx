import style from './RecipeCard.module.scss'
import RecipeChips from "../../shared/RecipeChips/RecipeChips.jsx";
import recipeClock from "../../assets/clock 16.svg";
import recipeImage from "../../assets/test.jpg";
import ButtonLike from "../../shared/Buttons/ButtonLike/ButtonLike.jsx";
import ButtonComments from "../../shared/Buttons/ButtonComments/ButtonComments.jsx";

function RecipeCard() {
  return (
 <section className={style.recipeCard}>
<RecipeChips/>
   <img width="200px"
        src={recipeImage} alt="recipeImg"/>
   <h3 className={style.recipeCard__name}>Булочки синнабон с корицей с глазурью из сахара и белым шоколадом и восхитител</h3>
   <p>Марина Иванова</p>
   <div>
     <img width="16px"
          src={recipeClock} alt="clock"/>
     <p>более 2 часов</p>
   </div>
   <div>

     <ButtonLike/>
     <ButtonComments/>
   </div>

 </section>
  )
}

export default RecipeCard