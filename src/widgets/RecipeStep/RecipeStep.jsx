import style from './RecipeStep.module.scss'
import styles from './../../pages/AddRecipe/AddRecipe.module.scss'

import ImageBlur from "../ImageBlur/ImageBlur.jsx";
import ButtonPicture from "../../shared/Buttons/ButtonPicture/ButtonPicture.jsx";
import AddPhotoRecipe from "../AddPhotoRecipe/AddPhotoRecipe.jsx";
import {useEffect, useRef, useState} from "react";
import TextareaAutosize from 'react-textarea-autosize';
import PopupCropImage from "../Popup/PopupCropImage/PopupCropImage.jsx";

function RecipeStep({
                      obj,
                      setInstantStepRecipeWithGallery,
                      fileUpload,
                      instantStepRecipeWithGallery,
                      setStepRecipeForError,
                      popupCropImage,
                      setPopupCropImage, setMainRecipeImage, setFileUpload,
                    }) {


  const [stepRecipeInfo, setStepRecipeInfo] = useState({id: obj.id, step: '', url: '', text: ''})


  useEffect(() => {
    const updatedItems = instantStepRecipeWithGallery
    const ind = updatedItems.findIndex(i => i.id === obj.id)

    if (ind === -1)
      updatedItems.push(stepRecipeInfo)
    else
      updatedItems[ind] = stepRecipeInfo
    setInstantStepRecipeWithGallery(updatedItems)

  }, [stepRecipeInfo])
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
        <AddPhotoRecipe stepRecipeInfo={stepRecipeInfo} popupCropImage={popupCropImage}
                        setMainRecipeImage={setMainRecipeImage} setPopupCropImage={setPopupCropImage}
                        setFileUpload={setFileUpload}/>

        : <ImageBlur image={stepRecipeInfo.url}/>}

      <TextareaAutosize defaultValue={'введите описание шага'} className={style.recipeStep__step}
                        placeholder={'введите описание шага'} value={stepRecipeInfo?.text}
                        onChange={(e) => setStepRecipeInfo({
                          id: obj.id,
                          step: stepRecipeInfo?.step,
                          url: stepRecipeInfo?.url,
                          text: e.target.value
                        })}/>
      {popupCropImage === true &&
        <div className={styles.addRecipe__popup}>
          <PopupCropImage setMainRecipeImage={setMainRecipeImage} stepRecipeInfo={stepRecipeInfo} fileUpload={fileUpload} obj={obj} setStepRecipeInfo={setStepRecipeInfo}
                           setPopupCropImage={setPopupCropImage}
                          popupCropImage={popupCropImage}/>
          <div className={styles.addRecipe__overlay}></div>
        </div>}
    </section>

  )
}

export default RecipeStep
