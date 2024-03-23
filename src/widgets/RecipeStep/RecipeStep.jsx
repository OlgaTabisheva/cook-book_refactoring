import style from './RecipeStep.module.scss'
import ImageBlur from "../ImageBlur/ImageBlur.jsx";
import ButtonPicture from "../../shared/Buttons/ButtonPicture/ButtonPicture.jsx";
import AddPhotoRecipe from "../AddPhotoRecipe/AddPhotoRecipe.jsx";
import {useEffect, useRef, useState} from "react";
import TextareaAutosize from 'react-textarea-autosize';
function RecipeStep({image,numberStep, text, obj, setInstantStepRecipeWithGallery, instantStepRecipeWithGallery}) {


  const [stepRecipeInfo, setStepRecipeInfo] = useState({id: obj.id, step: '', url: '', text: ''})

  useEffect(()=>{

  console.log(instantStepRecipeWithGallery,'instantStepRecipeWithGallery')

},[instantStepRecipeWithGallery])

  useEffect(() => {
    const updatedItems = instantStepRecipeWithGallery
    const ind = updatedItems.findIndex(i => i.id === obj.id)

    if (ind === -1)
      updatedItems.push(stepRecipeInfo)
    else
      updatedItems[ind] = stepRecipeInfo
    setInstantStepRecipeWithGallery(updatedItems)
  }, [stepRecipeInfo])



  function handleDeleteStep(id) {
    const updatedItems = instantStepRecipeWithGallery.filter(i => i.id !== id.id)
    setInstantStepRecipeWithGallery(updatedItems)
  }
  return (
    <section className={style.recipeStep}>
      <div className={style.recipeStep__menu}>
        <div className={style.recipeStep__box}>
        <h3 className={style.recipeStep__subtitle}>Шаг:</h3>
        <input className={style.recipeStep__input} placeholder={'введите название или номер шага'} value={stepRecipeInfo?.step} onChange={(e) => setStepRecipeInfo({
            id: obj.id,
            step:  e.target.value,
            url: obj.url,
            text: stepRecipeInfo?.text
          })}/>
        </div>
        <ButtonPicture value={'close'} size={'normal'} onClick={()=>handleDeleteStep(obj)}/>
      </div>
      {!stepRecipeInfo?.url ? <AddPhotoRecipe obj={obj} stepRecipeInfo={stepRecipeInfo} setStepRecipeInfo={setStepRecipeInfo}/>

        : <ImageBlur image={stepRecipeInfo.url}/>}

      <input className={style.recipeStep__step} placeholder={'введите массу'} value={stepRecipeInfo?.text}
             onChange={(e) => setStepRecipeInfo({
               id: obj.id,
               step: obj.step,
               url: obj.url,
               text: e.target.value
             })}/>
    </section>

  )
}

export default RecipeStep
