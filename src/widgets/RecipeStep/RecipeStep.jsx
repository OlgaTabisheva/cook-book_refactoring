import style from './RecipeStep.module.scss'
import ImageBlur from "../ImageBlur/ImageBlur.jsx";
import ButtonPicture from "../../shared/Buttons/ButtonPicture/ButtonPicture.jsx";

function RecipeStep({image,numberStep, text}) {
  return (
    <section className={style.recipeStep}>
      <div className={style.recipeStep__menu}>
        <h3 className={style.recipeStep__subtitle}>Шаг {numberStep}:</h3>
        <ButtonPicture value={'close'} size={'normal'}/>
      </div>
      <ImageBlur image={image}/>
      <div className={style.recipeStep__step}>
        {text}
      </div>

    </section>

  )
}

export default RecipeStep
