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
                      numberStepInPopupImageCrop,
                      instantStepRecipeInfo,
                      popupDelImage,
                      setPopupDelImage,
                      setDelImageFromStorage,
                      openSettingPopup,
                      setOpenSettingPopup,
                      fullRecipe
                    }) {


  const [stepRecipeInfo, setStepRecipeInfo] = useState({id: obj?.id, step: '', url: '', urlId: '', text: ''})
  const [delStepImageFromStorage, setDelStepImageFromStorage] = useState()
//


  /*  useEffect(() => {
      console.log(instantStepRecipeWithGallery?.length>2 ,'instantStepRecipeWithGallery?.length>0 ')
      if (instantStepRecipeWithGallery?.length>1 ) {
        if (!fullRecipe?.steps) {
          const updatedItems = instantStepRecipeWithGallery
          const ind = updatedItems.findIndex(i => i?.id === obj?.id)
          updatedItems[ind] = ({
            id: obj?.id,
            step: stepRecipeInfo?.step,
            url: instantStepRecipeWithGallery[ind]?.url,
            urlId: instantStepRecipeWithGallery[ind]?.urlId,
            text: stepRecipeInfo?.text
          })
          setInstantStepRecipeWithGallery[ind](updatedItems)
        }

        //localStorage.setItem("instantSteps", JSON.stringify(instantStepRecipeWithGallery))
      }
    }, [stepRecipeInfo])*/


  useEffect(() => {
    const updatedItems = instantStepRecipeWithGallery
    const ind = updatedItems.findIndex(i => i.id === obj.id)
    if (stepRecipeInfo?.text || stepRecipeInfo?.steps) {
      //  console.log(ind, 'ind')
      if (ind === -1) {
        updatedItems.push(stepRecipeInfo)
      }
      if (stepRecipeInfo) {
        updatedItems[ind] = stepRecipeInfo
      }
      setInstantStepRecipeWithGallery(updatedItems)
    }

  }, [stepRecipeInfo])

  useEffect(() => {
    setStepRecipeForError(stepRecipeInfo?.text)
  }, [stepRecipeInfo?.text])

  useEffect(() => {
    if (instantStepRecipeInfo?.url?.length > 0 && instantStepRecipeInfo?.id === stepRecipeInfo?.id) {
      setStepRecipeInfo({
        id: stepRecipeInfo?.id,
        step: stepRecipeInfo?.step,
        url: instantStepRecipeInfo?.url,
        urlId: instantStepRecipeInfo?.urlId,
        text: stepRecipeInfo?.text
      })
    }


  }, [instantStepRecipeInfo])

  useEffect(() => {

    const updatedItems = instantStepRecipeWithGallery
    const ind = updatedItems.findIndex(i => i?.id === obj?.id)
    setStepRecipeInfo(updatedItems[ind])
    //localStorage.setItem("instantSteps", JSON.stringify(instantStepRecipeWithGallery))

  }, [instantStepRecipeWithGallery])
  const DEL_IMAGE_FROM_STORAGE =
    gql`
   mutation MyMutation2 {
    deleteFile(id: "${delStepImageFromStorage}") {
      id
    }
  }
  `
  const [deleteImageFromStorage] = useMutation(DEL_IMAGE_FROM_STORAGE)

  async function handleDeleteStep(id) {
    setDelStepImageFromStorage(id?.urlId)
    const updatedItems = instantStepRecipeWithGallery.filter(i => i.id !== id.id)
    if (delStepImageFromStorage.length > 0) {

      deleteImageFromStorage()
        .then(
          setInstantStepRecipeWithGallery(updatedItems)
        )
        .then(toast.success('Удалено успешно!'))
        .catch((err) => {
          toast.error('Произошла ошибка', err)
        })
    }
  }


  return (

    <section className={style.recipeStep}>

      <div className={style.recipeStep__menu}>
        <div className={style.recipeStep__box}>
          <h3 className={style.recipeStep__subtitle}>Шаг:</h3>
          <input className={style.recipeStep__input} placeholder={'введите название или номер шага'}
                 value={stepRecipeInfo?.step ? stepRecipeInfo?.step : stepRecipeInfo?.id}
                 onChange={(e) => setStepRecipeInfo({
                   id: obj.id,
                   step: e.target.value,
                   url: stepRecipeInfo?.url,
                   urlId: instantStepRecipeInfo?.urlId,
                   text: stepRecipeInfo?.text
                 })}/>
        </div>
        {instantStepRecipeWithGallery.length > 1 &&
          <ButtonPicture value={'close'} size={'normal'} onClick={() => handleDeleteStep(obj)}/>}

      </div>
      {!stepRecipeInfo?.url ?
        <AddPhotoRecipe numberStepInPopupImageCrop={numberStepInPopupImageCrop}
                        setNumberStepInPopupImageCrop={setNumberStepInPopupImageCrop} stepRecipeInfo={stepRecipeInfo}
                        setMainRecipeImage={setMainRecipeImage}
                        setFileUpload={setFileUpload} setPopupCropImage={setPopupCropImage}
                        popupCropImage={popupCropImage}/>

        : <ImageBlur setDelImageFromStorage={setDelImageFromStorage} stepRecipeInfo={stepRecipeInfo}
                     popupDelImage={popupDelImage} setPopupDelImage={setPopupDelImage}
                     setOpenSettingPopup={setOpenSettingPopup} openSettingPopup={openSettingPopup}
                     image={stepRecipeInfo}/>}

      <TextareaAutosize className={style.recipeStep__step}
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
