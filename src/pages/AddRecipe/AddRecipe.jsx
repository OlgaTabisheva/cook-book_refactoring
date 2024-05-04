import style from './AddRecipe.module.scss'
import HeaderMini from "../../widgets/HeaderMini/HeaderMini.jsx";
import InputAuth from "../../shared/InputAuth/InputAuth.jsx";
import ProductQuantity from "../../widgets/ProductQuantity/ProductQuantity.jsx";
import ButtonChips from "../../shared/Buttons/ButtonChips/ButtonChips.jsx";
import ButtonBasic from "../../shared/Buttons/ButtonBasic/ButtonBasic.jsx";
import RecipeStep from "../../widgets/RecipeStep/RecipeStep.jsx";
import {useEffect, useState} from "react";
import CategoryList from "../../widgets/CategoryList/CategoryList.jsx";
import AddPhotoRecipe from "../../widgets/AddPhotoRecipe/AddPhotoRecipe.jsx";
import ImageBlur from "../../widgets/ImageBlur/ImageBlur.jsx";
import {Link, Navigate, useNavigate, useParams} from "react-router-dom";
import {useUserData} from "@nhost/react";
import {gql, useMutation} from "@apollo/client";
import {toast} from "react-hot-toast";
import PaginationBasic from "../../widgets/PaginationBasic/PaginationBasic.jsx";
import PopupBasic from "../../widgets/Popup/PopupBasic/PopupBasic.jsx";
import PopupCropImage from "../../widgets/Popup/PopupCropImage/PopupCropImage.jsx";


function AddRecipe({
                     allCategories,
                     allDuration,
                     instantAddRecipe,
                     setInstantAddRecipe,
                     formValuesRecipe,
                     chosenTextCategoryStep1,
                     setChosenTextCategoryStep1
                   }) {
  const {id} = useParams();
  const navigate = useNavigate();
  const user = useUserData()
  // const fullRecipe = instantAddRecipe?.recipes.find(elem => elem.id === id);
  const [textProductForError, setTextProductForError] = useState()
  const [stepRecipeForError, setStepRecipeForError] = useState()
  const [popupCloseAddRecipe, setPopupCloseAddRecipe] = useState(false)
  const [closeAddRecipe, setCloseAddRecipe] = useState(false)
  const [popupCropImage, setPopupCropImage] = useState(false)
  const [popupDelImage, setPopupDelImage] = useState(false)
  const [fileUpload, setFileUpload] = useState()
  const [chosenTextDuration, setChosenTextDuration] = useState('')
  const [chosenTextCategory, setChosenTextCategory] = useState('')
  const [lineNumber, setLineNumber] = useState(1)
  const [stepNumber, setStepNumber] = useState(1)
  const [numberStepInPopupImageCrop, setNumberStepInPopupImageCrop] = useState()
  const [delImageFromStorage, setDelImageFromStorage] = useState()
  const [openSettingPopup, setOpenSettingPopup] = useState(false)
  const [productQuantityMap, setProductQuantityMap] = useState([{
    number: lineNumber,
    product: 'первый',
    unit: 'первый',
    count: 'первый'
  }])
  const [instantStepRecipeWithGallery, setInstantStepRecipeWithGallery] = useState([{ id: 1, step: 1, url: '', text: '', urlId: ''}]);
  const [instantStepRecipeInfo, setInstantStepRecipeInfo] = useState()
  const [mainRecipeImage, setMainRecipeImage] = useState(null)
  const [nameRecipe, setNameRecipe] = useState()
  const [formValidityAddRecipe, setFormValidityAddRecipe] = useState({
    nameValid: false,
    categoryValid: false,
    photoValid: false,
    durationValid: false,
    productsValid: false,
    stepsValid: false

  });

  const UPDATE_RECIPE = gql`
mutation UpdateRecipe( $id: uuid = "${id}", $recipes_category: smallint!, $description: String!, $food: String!, $steps: String!, $long: smallint!, $name: String!, $photo: String!) {
  update_recipes_by_pk(pk_columns: {id: $id}, _set: {recipes_category: $recipes_category, steps: $steps, description: $description, food: $food, long: $long, name: $name, photo: $photo})
 {
      recipes_category
      description
      food
      long
      name
      photo
      steps
    }
}`
  const [mutateRecipe] = useMutation(UPDATE_RECIPE)
const [stepFromStorage, setStepFromStorage]= useState()
  const DEL_IMAGE_FROM_STORAGE =
    gql`
   mutation MyMutation2 {
    deleteFile(id: "${delImageFromStorage}") {
      id
    }
  }
  `
  const [deleteImageFromStorage] = useMutation(DEL_IMAGE_FROM_STORAGE)

  const {nameValid, categoryValid, photoValid, durationValid, productsValid, stepsValid} = formValidityAddRecipe;
  const isSubmitDisabled = !nameValid || !categoryValid || !photoValid || !durationValid || !productsValid || !stepsValid;

  useEffect(()=>
  {
    const data = window.localStorage.getItem('instantSteps');

    if (data !== null) setInstantStepRecipeWithGallery(JSON.parse(data));

    const list = JSON.parse(data)
    setStepFromStorage(list)

  },[])
  useEffect(() => {
    if (instantStepRecipeInfo?.url?.length > 0) {
      const updatedItems = instantStepRecipeWithGallery
      const ind = updatedItems.findIndex(i => i.id === instantStepRecipeInfo?.id)
      updatedItems[ind].url = instantStepRecipeInfo?.url
      setInstantStepRecipeWithGallery(updatedItems)

    }
    }, [instantStepRecipeInfo, instantStepRecipeWithGallery])
  useEffect(() => {
    if (instantStepRecipeInfo?.urlId?.length > 0) {
      const updatedItems = instantStepRecipeWithGallery
      const ind = updatedItems.findIndex(i => i.id === instantStepRecipeInfo?.id)
      updatedItems[ind].urlId = instantStepRecipeInfo?.urlId
      setInstantStepRecipeWithGallery(updatedItems)

    }
  }, [instantStepRecipeInfo, instantStepRecipeWithGallery])

  useEffect(function validateInputs() {

    const isRecipeName = nameRecipe?.length > 3
    const isRecipeCategory = chosenTextCategory?.category?.length > 0
    const isMainRecipePhoto = mainRecipeImage?.url.length > 10
    const isRecipeDuration = chosenTextDuration?.duration?.length > 0
    const isRecipeProduct = textProductForError?.length > 2
    const isRecipeStep = stepRecipeForError?.length > 20
    setFormValidityAddRecipe(prevValidity => ({
      nameValid: isRecipeName,
      categoryValid: isRecipeCategory,
      photoValid: isMainRecipePhoto,
      durationValid: isRecipeDuration,
      productsValid: isRecipeProduct,
      stepsValid: isRecipeStep,

    }))

  }, [nameRecipe, chosenTextCategory, mainRecipeImage, chosenTextDuration, textProductForError, stepRecipeForError])


  useEffect(() => {
    setNameRecipe(formValuesRecipe?.name)
    setChosenTextCategory(chosenTextCategoryStep1)
  }, [])

  function handleDuration(obj) {
    setChosenTextDuration(obj)
  }

  function handleAddProduct() {
    const newLineNumber = lineNumber + 1
    setProductQuantityMap(() => [...productQuantityMap, {
      number: newLineNumber,
      product: `Введите продукт`,
      unit: 'ед.изм',
      count: 'вес'
    }])
    setLineNumber(newLineNumber)
  }

  const updateRecipe = async (e) => {
    e.preventDefault()
    try {
      await mutateRecipe({
        variables: {
          id: id,
          recipes_category: chosenTextCategory?.number,
          food: JSON.stringify(productQuantityMap),
          long: JSON.stringify(chosenTextDuration?.number),
          name: nameRecipe,
          photo: mainRecipeImage,
          steps: JSON.stringify(instantStepRecipeWithGallery),
          description: '123'
        }

      }).then((rez) => {
        const recipesArray = [
          ...instantAddRecipe.recipes, {
            recipes_category: rez.data.update_recipes_by_pk.category,
            name: rez.data.update_recipes_by_pk.name,
            photo: rez.data.update_recipes_by_pk.photo,
            steps: rez.data.update_recipes_by_pk.steps,
            food: rez.data.update_recipes_by_pk.food,
            long: rez.data.update_recipes_by_pk.long,
            description: rez.data.update_recipes_by_pk.description,
          }]

        setInstantAddRecipe({recipes: recipesArray})
        navigate(`/recipe/${id}`)
      })
   //   localStorage.removeItem("instantSteps")
      toast.success('Обновленно успешно!');

    } catch (error) {
      toast.error('Произошла ошибка')
    }
  }


  function handleAddStep() {

    const item = instantStepRecipeWithGallery[instantStepRecipeWithGallery.length - 1].id
    const newStepNumber = stepNumber + item + 1
    if (item===0){
      setStepNumber(item+1)
    }
    if (item>0){
      setStepNumber(item+1)
    }
    setInstantStepRecipeWithGallery(() => [...instantStepRecipeWithGallery, {
      id: newStepNumber,
      step: 1+newStepNumber,
      url: '',
      text: '',
      urlId: '',

    }])
    setStepNumber(newStepNumber)
  //  localStorage.setItem("instantSteps", JSON.stringify(instantStepRecipeWithGallery))
  }

  function handleCloseRecipe(){
//localStorage.removeItem("instantSteps")
    setCloseAddRecipe(!closeAddRecipe)

  }

 function handleDelImage() {
 if (mainRecipeImage?.id === delImageFromStorage) {
    deleteImageFromStorage()
      .then(
        setMainRecipeImage(
          {
            url: '', id: ''
          }
        )
      ).then(setPopupDelImage(!popupDelImage))
      .then(setOpenSettingPopup(!openSettingPopup))
      .then(toast.success('Удалено успешно!'))
      .catch((err) => {
        toast.error('Произошла ошибка', err)
      })
  }

    const RecipeStepImage = instantStepRecipeWithGallery.find(image => image.urlId === delImageFromStorage);
 let StepRecipe ={ id: instantStepRecipeWithGallery.find(image => image.urlId === delImageFromStorage)?.id, step: instantStepRecipeWithGallery.find(image => image.urlId === delImageFromStorage)?.step , url: '', text: instantStepRecipeWithGallery.find(image => image.urlId === delImageFromStorage)?.text, urlId: ''}
   console.log(StepRecipe,RecipeStepImage, 'RecipeStepImage StepRecipe')
 /*  if (RecipeStepImage > 0 ) {
     deleteImageFromStorage()
       .then(setPopupDelImage(!popupDelImage))
       .then(setOpenSettingPopup(!openSettingPopup))
       .then(toast.success('Удалено успешно!'))
       .catch((err) => {
         toast.error('Произошла ошибка', err)
       })
   }*/

}


  return (
    <section className={style.addRecipe}>
      <HeaderMini color={'SandColorful10'} onClick={() => setPopupCloseAddRecipe(!popupCloseAddRecipe)}/>
      <form className={style.addRecipe__box} onSubmit={updateRecipe}>
        <div className={style.addRecipe__boxName}>
          <h2 className={style.addRecipe__title}>Редактирование рецепта</h2>
          <InputAuth error={!nameValid} errorText={'Название рецепта слишком короткое'} title={'Название рецепта'}
                     placeholder={'Булочки синабонн с корицей и сахарной пудрой'} value={nameRecipe}
                     onChange={(e) => setNameRecipe(e.target.value)}/>
        </div>
        <div className={style.addRecipe__categoriesBox}>
          <CategoryList allCategories={allCategories} chosenTextCategory={chosenTextCategory.category}
                        setChosenTextCategory={setChosenTextCategory}/>
          {chosenTextCategory?.number && <span
            className={!categoryValid ? style.addRecipe__span : style.addRecipe__span_hidden}>Категория не задана</span>}
        </div>

        <div className={style.addRecipe__photoBox}>
          <h3 className={style.addRecipe__subtitle}>Фото готового блюда:</h3>
          {((mainRecipeImage?.url === undefined) || (mainRecipeImage?.url === '' )) ?
            <AddPhotoRecipe numberStepInPopupImageCrop={numberStepInPopupImageCrop}
                            setNumberStepInPopupImageCrop={setNumberStepInPopupImageCrop}
                            popupCropImage={popupCropImage} setPopupCropImage={setPopupCropImage}
                            setFileUpload={setFileUpload}  setMainRecipeImage={setMainRecipeImage}/>
            :
            <ImageBlur setDelImageFromStorage={setDelImageFromStorage} mainRecipeImage={mainRecipeImage} setOpenSettingPopup={setOpenSettingPopup} openSettingPopup={openSettingPopup} popupDelImage={popupDelImage} setPopupDelImage={setPopupDelImage} image={mainRecipeImage}/>}</div>
        {mainRecipeImage &&
          <span className={!photoValid ? style.addRecipe__span : style.addRecipe__span_hidden}>Загрузите фото готового блюда</span>}

        <div className={style.addRecipe__cover}>
          <h3 className={style.addRecipe__subtitle}>Длительность приготовления:</h3>
          <div className={style.addRecipe__boxCategory}>
            {allDuration?.duration?.map((obj) => (

              <ButtonChips key={obj.duration} text={obj ? obj.duration : ''} onClick={() => handleDuration(obj)}
                           chosenText={chosenTextDuration.duration}></ButtonChips>

            ))}

          </div>
          {chosenTextDuration?.duration &&
            <span className={!durationValid ? style.addRecipe__span : style.addRecipe__span_hidden}>Длительность приготовления не задана</span>}

        </div>
        <h3 className={style.addRecipe__subtitle}>Состав:</h3>
        <li className={style.addRecipe__quantity} key="tbody">
          {productQuantityMap?.map((obj, num) => (
            <ul key={num}>
              <ProductQuantity
                obj={obj}
                setProductQuantityMap={setProductQuantityMap}
                productQuantityMap={productQuantityMap} setTextProductForError={setTextProductForError}/>
            </ul>))}
        </li>
        <ButtonBasic color={'secondaryGreen'} type={'button'} text={'Добавить продукт'}
                     onClick={() => handleAddProduct()}/>
        {textProductForError &&
          <span className={!productsValid ? style.addRecipe__span : style.addRecipe__span_hidden}>Состав должен состоять из 1 продукта минимум</span>}

        <li className={style.addRecipe__steps}>
          <h3 className={style.addRecipe__subtitleLeft}>Пошаговое приготовление:</h3>
          {instantStepRecipeWithGallery?.map((obj,index) => (
              <ul className={style.addRecipe__boxSteps} key={instantStepRecipeWithGallery.indexOf(obj)}>
                <RecipeStep popupDelImage={popupDelImage} setPopupDelImage={setPopupDelImage} setPopupCropImage={setPopupCropImage}
                            popupCropImage={popupCropImage} instantStepRecipeInfo={instantStepRecipeInfo}
                            setInstantStepRecipeInfo={setInstantStepRecipeInfo} setFileUpload={setFileUpload}
                            fileUpload={fileUpload}
                            obj={obj} instantStepRecipeWithGallery={instantStepRecipeWithGallery}
                            setInstantStepRecipeWithGallery={setInstantStepRecipeWithGallery}
                            setStepRecipeForError={setStepRecipeForError}
                            numberStepInPopupImageCrop={numberStepInPopupImageCrop}
                            setDelImageFromStorage={setDelImageFromStorage} setNumberStepInPopupImageCrop={setNumberStepInPopupImageCrop} setOpenSettingPopup={setOpenSettingPopup} openSettingPopup={openSettingPopup}
                />
              </ul>
            )
          )}
        </li>
        <ButtonBasic type={'button'} color={'secondaryGreen'} text={'Добавить шаг'} onClick={() => handleAddStep()}/>
        {stepRecipeForError &&
          <span className={!stepsValid ? style.addRecipe__span : style.addRecipe__span_hidden}>Не добавлен текст в первый шаг.</span>}

        <div className={style.addRecipe__button}>
          <ButtonBasic color={'primaryGreen'} text={'Отправить на модерацию'} type='submit'
                       disabled={isSubmitDisabled}/>
        </div>
        {/*  <PopupBasic title={"Удалить рецепт?"} text={'Вы действительно хотите удалить рецепт «Булочки синнабон с корицей»?'}/>*/}

      </form>
      {/*
      <div  className={style.addRecipe__imagePepper}/>
      <div  className={style.addRecipe__imageGarlic}/>
      <div  className={style.addRecipe__imageTomato}/>*/}

      {popupCloseAddRecipe === true && <div className={style.addRecipe__popup}>
        <PopupBasic text={'Внесенные изменения не сохранятся'} title={'Выйти?'}
                    popupCloseAddRecipe={popupCloseAddRecipe} setCloseAddRecipe={setCloseAddRecipe}
                    setPopupCloseAddRecipe={setPopupCloseAddRecipe} textButtonGo={'Выйти'}
                    closeAddRecipe={closeAddRecipe} exitClick={() => handleCloseRecipe()}/>
        <div className={style.addRecipe__overlay}></div>
      </div>}
      {popupDelImage === true && <div className={style.addRecipe__popup}>
        <PopupBasic text={'Вы действительно хотите удалить это изображение?'} title={'Отменить'}
                    popupCloseAddRecipe={popupDelImage} setCloseAddRecipe={setCloseAddRecipe}
                    setPopupCloseAddRecipe={setPopupDelImage} textButtonGo={'Удалить'}
                    closeAddRecipe={closeAddRecipe} exitClick={()=>handleDelImage()}/>
        <div className={style.addRecipe__overlay}></div>
      </div>}
      {popupCropImage === true && <div className={style.addRecipe__popup}>
        <PopupCropImage numberStepInPopupImageCrop={numberStepInPopupImageCrop}
                        setNumberStepInPopupImageCrop={setNumberStepInPopupImageCrop}
                        setInstantStepRecipeWithGallery={setInstantStepRecipeWithGallery}
                        instantStepRecipeWithGallery={instantStepRecipeWithGallery}
                        instantStepRecipeInfo={instantStepRecipeInfo}
                        setInstantStepRecipeInfo={setInstantStepRecipeInfo} setMainRecipeImage={setMainRecipeImage}
                        setPopupCropImage={setPopupCropImage}
                        popupCropImage={popupCropImage} fileUpload={fileUpload}/>
        <div className={style.addRecipe__overlay}></div>
      </div>}
    </section>
  )
}

export default AddRecipe
