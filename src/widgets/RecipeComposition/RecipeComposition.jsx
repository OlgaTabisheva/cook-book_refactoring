import style from './RecipeComposition.module.scss'
import Foodstuff from "../../shared/Foodstuff/Foodstuff.jsx";
import ButtonCounter from "../../shared/Buttons/ButtonCounter/ButtonCounter.jsx";
import ButtonPicture from "../../shared/Buttons/ButtonPicture/ButtonPicture.jsx";

function RecipeComposition({recipeCompositionMap}) {
  return (
    <div
      className={style.recipeComposition}>
      <h3 className={style.recipeComposition__title}>Состав</h3>
      <div className={style.recipeComposition__counter}>
        <ButtonPicture value={'minus'} disabled size={'normal'}/>
        <p className={style.recipeComposition__counterText}>1</p>

        <ButtonPicture value={'plus'} size={'normal'}/>
      </div>

      <div className={style.recipeComposition__box}>
        {recipeCompositionMap?.map((obj) => (
        <Foodstuff key={obj?.product} obj={obj}/>
          ))}
      </div>

    </div>
  )
}

export default RecipeComposition
