import style from './RecipeStep.module.scss'
import ImageBlur from "../ImageBlur/ImageBlur.jsx";
import ButtonPicture from "../../shared/Buttons/ButtonPicture/ButtonPicture.jsx";
import AddPhotoRecipe from "../AddPhotoRecipe/AddPhotoRecipe.jsx";
import {useRef, useState} from "react";
import TextareaAutosize from 'react-textarea-autosize';
function RecipeStep({image,numberStep, text, obj}) {


const [stepTextAria,setStepTextAria] = useState()
  const [stepPhotoFile, setStepPhotoFile] = useState()
  
  return (
    <section className={style.recipeStep}>
      <div className={style.recipeStep__menu}>
        <h3 className={style.recipeStep__subtitle}>Шаг {obj.numberStep}:</h3>
        <ButtonPicture value={'close'} size={'normal'}/>
      </div>
      {!stepPhotoFile ? <AddPhotoRecipe setStepPhotoFile={setStepPhotoFile}/>

       : <ImageBlur image={image}/>}
      <TextareaAutosize className={style.recipeStep__step} placeholder={'введите текст шага'} value={ stepTextAria} onChange={(e) => setStepTextAria(e.target.value)}/>

    </section>

  )
}

export default RecipeStep
