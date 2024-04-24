import style from './RecipeStep.module.scss'
import ImageBlur from "../ImageBlur/ImageBlur.jsx";
import ButtonPicture from "../../shared/Buttons/ButtonPicture/ButtonPicture.jsx";
import AddPhotoRecipe from "../AddPhotoRecipe/AddPhotoRecipe.jsx";
import React, {useEffect, useContext, useState} from "react";
import TextareaAutosize from 'react-textarea-autosize';
import {gql, useMutation} from "@apollo/client";
import {toast} from "react-hot-toast";


function RecipeStep({
                      obj,
                      setInstantStepRecipeWithGallery,
                      instantStepRecipeWithGallery,
                      setStepRecipeForError,
                      setMainRecipeImage,
                      setFileUpload,
                      setPopupCropImage,
                      popupCropImage,
                      setNumberStepInPopupImageCrop,
                      numberStepInPopupImageCrop, instantStepRecipeInfo
                    }) {


  const [stepRecipeInfo, setStepRecipeInfo] = useState({id: obj.id, step: '', url: '',  urlId: '', text: ''})

 const DEL_IMAGE_FROM_STORAGE =
    gql`
   mutation MyMutation2 {
    deleteFile(id: "${obj.urlId}") {
      id
    }
  }
  `
  const [deleteImageFromStorage] = useMutation(DEL_IMAGE_FROM_STORAGE)
useEffect(()=>{
  const updatedItems = instantStepRecipeWithGallery
  const ind = updatedItems.findIndex(i => i.id === obj.id)
  setStepRecipeInfo(updatedItems[ind])
  console.log('1')
},[])
  /*
    useEffect(() => {
      const updatedItems = instantStepRecipeWithGallery
      const ind = updatedItems.findIndex(i => i.id === obj.id)
      if (ind === -1)
        updatedItems.push(stepRecipeInfo)
      else
        updatedItems[ind] = stepRecipeInfo
      setInstantStepRecipeWithGallery(updatedItems)
      console.log('2')

    }, [stepRecipeInfo, instantStepRecipeWithGallery])*/

  useEffect(() => {
    setStepRecipeForError(stepRecipeInfo?.text)
    console.log(stepRecipeInfo?.text, '3')

  }, [stepRecipeInfo?.text])

  useEffect(() => {
    if (instantStepRecipeInfo?.url.length > 0 && instantStepRecipeInfo?.id === stepRecipeInfo?.id) {
      setStepRecipeInfo({
        id: stepRecipeInfo?.id,
        step: stepRecipeInfo?.step,
        url: instantStepRecipeInfo?.url,
        urlId: instantStepRecipeInfo?.urlId,
        text: stepRecipeInfo?.text
      })
    }
    console.log('4')

  }, [instantStepRecipeInfo ])

  function handleDeleteStep(id) {
    console.log('5')

    console.log(id, 'id')
    const updatedItems = instantStepRecipeWithGallery.filter(i => i.id !== id.id)

    console.log(updatedItems, 'updatedItems')
if (id?.urlId === ''){
  alert('К сожалению пока не удалено')
}
    deleteImageFromStorage()
      .then(
        setStepRecipeInfo(
          {
            id: stepRecipeInfo?.id, step: stepRecipeInfo?.step, url: '',  urlId: '', text: stepRecipeInfo?.text
          }
        )
      ).then(
      setInstantStepRecipeWithGallery(updatedItems)
    )

      .then(toast.success('Удалено успешно!')).catch((err) => {
      toast.error('Произошла ошибка', err)
    })

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
            urlId: instantStepRecipeInfo?.urlId,
            text: stepRecipeInfo?.text
          })}/>
        </div>
        <ButtonPicture value={'close'} size={'normal'} onClick={() => handleDeleteStep(obj)}/>
      </div>
      {!stepRecipeInfo?.url ?
        <AddPhotoRecipe numberStepInPopupImageCrop={numberStepInPopupImageCrop}
                        setNumberStepInPopupImageCrop={setNumberStepInPopupImageCrop} stepRecipeInfo={stepRecipeInfo}
                        setMainRecipeImage={setMainRecipeImage}
                        setFileUpload={setFileUpload} setPopupCropImage={setPopupCropImage}
                        popupCropImage={popupCropImage}/>

        : <ImageBlur  image={stepRecipeInfo?.url}/>}

      <TextareaAutosize  className={style.recipeStep__step}
                        placeholder={'введите описание шага'} value={stepRecipeInfo?.text}
                        onChange={(e) => setStepRecipeInfo({
                          id: obj.id,
                          step: stepRecipeInfo?.step,
                          url: stepRecipeInfo?.url,
                          urlId: instantStepRecipeInfo?.urlId,
                          text: e.target.value
                        })}/>
    </section>

  )
}

export default RecipeStep
