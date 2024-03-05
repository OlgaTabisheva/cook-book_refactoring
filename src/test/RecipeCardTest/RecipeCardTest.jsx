import style from './RecipeCard.module.scss'
import RecipeChips from "../../shared/RecipeChips/RecipeChips.jsx";
import recipeClock from "../../assets/clock 16.svg";
import img from "../../assets/test.jpg";
import ButtonComments from "../../shared/Buttons/ButtonComments/ButtonComments.jsx";
import ButtonLikeFull from "../../shared/Buttons/ButtonLike/ButtonLikeFull.jsx";


function RecipeCardTest() {

  return (
    <section className={style.recipeCard}>
      <div className={style.recipeCard__imgBox}>
        <RecipeChips text={'Напитки'}/>
        <img className={style.recipeCard__img}
             src={img} alt="recipeImg"/>
      </div>
      <div className={style.recipeCard__textBox}>
        <h3 className={style.recipeCard__name}>{"Булочки"}</h3>
        <p className={style.recipeCard__text}>Марина Иванова</p>
        <div className={style.recipeCard__clock}>
          <img className={style.recipeCard__imgClock}
               src={recipeClock} alt="clock"/>
          <p className={style.recipeCard__text}>{"более 2 часов"}</p>
        </div>
      </div>
      <div className={style.recipeCard__box}>

        <ButtonLikeFull countLikes={5}/>

        <ButtonComments countComments={5}/>
      </div>

    </section>
  )
}

export default RecipeCardTest