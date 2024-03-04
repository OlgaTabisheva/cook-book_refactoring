import style from './RecipeComposition.module.scss'
import Foodstuff from "../../shared/Foodstuff/Foodstuff.jsx";
import ButtonCounter from "../../shared/Buttons/ButtonCounter/ButtonCounter.jsx";
import ButtonPicture from "../../shared/Buttons/ButtonPicture/ButtonPicture.jsx";

function RecipeComposition() {
  return (
    <div
      className={style.recipeComposition}>
      <h3 className={style.recipeComposition__title}>Состав</h3>
      <div className={style.recipeComposition__counter}>
        <ButtonPicture value={'plus'} />
        <p className={style.recipeComposition__counterText}>1</p>
        <ButtonPicture value={'minus'}/>
      </div>

<div className={style.recipeComposition__box}>
  <Foodstuff/>
  <Foodstuff/>
  <Foodstuff/>
  <Foodstuff/>
  <Foodstuff/>
  <Foodstuff/>
  <Foodstuff/>
  <Foodstuff/>
</div>

    </div>
  )
}

export default RecipeComposition
