import style from './RecipeStep.module.scss'
import styles from './../../pages/AddRecipe/AddRecipe.module.scss'

import ImageBlur from "../ImageBlur/ImageBlur.jsx";
import ButtonPicture from "../../shared/Buttons/ButtonPicture/ButtonPicture.jsx";
import AddPhotoRecipe from "../AddPhotoRecipe/AddPhotoRecipe.jsx";
import React, { useEffect, useContext, useState} from "react";
import TextareaAutosize from 'react-textarea-autosize';
import PopupCropImage from "../Popup/PopupCropImage/PopupCropImage.jsx";



function RecipeStep({
                      obj,
                      setInstantStepRecipeWithGallery,
                      instantStepRecipeWithGallery,
                      setStepRecipeForError,
                       setMainRecipeImage, setFileUpload,
  instantStepRecipeInfo, setInstantStepRecipeInfo, setPopupCropImage, popupCropImage, setNumberStepInPopupImageCrop, numberStepInPopupImageCrop
                    }) {


  const [stepRecipeInfo, setStepRecipeInfo] = useState({id: obj.id, step: '', url: '', text: ''})

useEffect(()=>{
  setInstantStepRecipeInfo(stepRecipeInfo)
},[stepRecipeInfo])

/*useEffect(()=>{
  if (urlStepImage?.id === obj.id)
  setStepRecipeInfo({
    id: stepRecipeInfo.id, step: stepRecipeInfo?.step, url: urlStepImage?.url, text: stepRecipeInfo?.text
  })
  console.log(urlStepImage?.url, 'urlStepImage')
},[urlStepImage])*/


  useEffect(() => {
    const updatedItems = instantStepRecipeWithGallery
    const ind = updatedItems.findIndex(i => i.id === obj.id)
    if (ind === -1)
      updatedItems.push(stepRecipeInfo)
    else
      updatedItems[ind] = stepRecipeInfo
    setInstantStepRecipeWithGallery(updatedItems)

  }, [stepRecipeInfo,instantStepRecipeWithGallery ])


  useEffect(() => {
    setStepRecipeForError(stepRecipeInfo?.text)
  }, [stepRecipeInfo?.text])


  function handleDeleteStep(id) {
    const updatedItems = instantStepRecipeWithGallery.filter(i => i.id !== id.id)
    setInstantStepRecipeWithGallery(updatedItems)
  }

  return (

    <section className={style.recipeStep}>

      <div className={style.recipeStep__menu}>
        <div className={style.recipeStep__box}>
          <h3 className={style.recipeStep__subtitle}>Шаг:</h3>
          <input className={style.recipeStep__input} placeholder={'введите название или номер шага'}
                 value={stepRecipeInfo?.step} onChange={(e) => setStepRecipeInfo({
            id: obj.id,
            step: e.target.value,
            url: stepRecipeInfo?.url,
            text: stepRecipeInfo?.text
          })}/>
        </div>
        <ButtonPicture value={'close'} size={'normal'} onClick={() => handleDeleteStep(obj)}/>
      </div>
      {!stepRecipeInfo?.url ?
        <AddPhotoRecipe    numberStepInPopupImageCrop={numberStepInPopupImageCrop}
                           setNumberStepInPopupImageCrop={setNumberStepInPopupImageCrop}  stepRecipeInfo={stepRecipeInfo}
                        setMainRecipeImage={setMainRecipeImage}
                        setFileUpload={setFileUpload} setPopupCropImage={setPopupCropImage}
                         popupCropImage={popupCropImage}/>

        : <ImageBlur image={stepRecipeInfo.url}/>}

      <TextareaAutosize defaultValue={'введите описание шага'} className={style.recipeStep__step}
                        placeholder={'введите описание шага'} value={stepRecipeInfo?.text}
                        onChange={(e) => setStepRecipeInfo({
                          id: obj.id,
                          step: stepRecipeInfo?.step,
                          url: stepRecipeInfo?.url,
                          text: e.target.value
                        })}/>
    </section>

  )
}

export default RecipeStep
