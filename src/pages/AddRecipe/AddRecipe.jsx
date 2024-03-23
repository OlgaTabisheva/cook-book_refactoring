import style from './AddRecipe.module.scss'
import HeaderMini from "../../widgets/HeaderMini/HeaderMini.jsx";
import InputAuth from "../../shared/InputAuth/InputAuth.jsx";
import ProductQuantity from "../../widgets/ProductQuantity/ProductQuantity.jsx";
import test from './../../assets/test.jpg'
import ButtonChips from "../../shared/Buttons/ButtonChips/ButtonChips.jsx";
import ButtonBasic from "../../shared/Buttons/ButtonBasic/ButtonBasic.jsx";
import RecipeStep from "../../widgets/RecipeStep/RecipeStep.jsx";
import {useEffect, useState} from "react";
import CategoryList from "../../widgets/CategoryList/CategoryList.jsx";
import AddPhotoRecipe from "../../widgets/AddPhotoRecipe/AddPhotoRecipe.jsx";
import ImageBlur from "../../widgets/ImageBlur/ImageBlur.jsx";


function AddRecipe({allCategories, allDuration}) {

  const [chosenTextDuration, setChosenTextDuration] = useState('')
  const [chosenTextCategory, setChosenTextCategory] = useState('')
  const [lineNumber, setLineNumber] = useState(1)
  const [stepNumber, setStepNumber] = useState(1)
  const [productQuantityMap, setProductQuantityMap] = useState([{
    number: lineNumber,
    product: 'первый',
    unit: 'первый',
    count: 'первый'
  }])
  const [instantStepRecipeWithGallery, setInstantStepRecipeWithGallery] = useState([{
    id: stepNumber,
    step: 1,
    url: '',
    text: 'текст'
  }]);
  const [mainRecipeImage, setMainRecipeImage] = useState(null)


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

  useEffect(() => {
    console.log(productQuantityMap, 'productQuantityMap')
  }, [productQuantityMap])

  function handleAddStep() {
    const newStepNumber = stepNumber + 1

    setInstantStepRecipeWithGallery(() => [...instantStepRecipeWithGallery, {
      id: newStepNumber,
      step: 1,
      url: '',
      text: ''
    }])
    setStepNumber(newStepNumber)
  }

  return (
    <section className={style.addRecipe}>
      <HeaderMini color={'SandColorful10'}/>
      <div className={style.addRecipe__box}>
        <div className={style.addRecipe__boxName}>
          <h2 className={style.addRecipe__title}>Редактирование рецепта</h2>
          <InputAuth title={'Название рецепта'} text={'Булочки синабонн с корицей и сахарной пудрой'}/>
        </div>
        <CategoryList allCategories={allCategories} chosenTextCategory={chosenTextCategory.category}
                      setChosenTextCategory={setChosenTextCategory}/>
        <div className={style.addRecipe__photoBox}>
          <h3 className={style.addRecipe__subtitle}>Фото готового блюда:</h3>
          {!mainRecipeImage ?
            <AddPhotoRecipe mainRecipeImage={mainRecipeImage} setMainRecipeImage={setMainRecipeImage}/>
            :
            <ImageBlur image={test}/>}</div>


        <div className={style.addRecipe__cover}>
          <h3 className={style.addRecipe__subtitle}>Длительность приготовления:</h3>
          <div className={style.addRecipe__boxCategory}>
            {allDuration?.duration?.map((obj) => (

              <ButtonChips key={obj.duration} text={obj ? obj.duration : ''} onClick={() => handleDuration(obj)}
                           chosenText={chosenTextDuration.duration}></ButtonChips>

            ))}
          </div>
        </div>
        <h3 className={style.addRecipe__subtitle}>Состав:</h3>
        <li className={style.addRecipe__quantity} key="tbody">
          {productQuantityMap?.map((obj) => (
            <ul key={obj.number}>
              <ProductQuantity
                obj={obj}
                setProductQuantityMap={setProductQuantityMap}
                productQuantityMap={productQuantityMap}/>
            </ul>))}
        </li>
        <ButtonBasic color={'secondaryGreen'} text={'Добавить продукт'} onClick={() => handleAddProduct()}/>
        <li className={style.addRecipe__steps}>
          <h3 className={style.addRecipe__subtitleLeft}>Пошаговое приготовление:</h3>
          {instantStepRecipeWithGallery?.map((obj) => (
              <ul className={style.addRecipe__boxSteps} key={obj.id}>
                <RecipeStep obj={obj} instantStepRecipeWithGallery={instantStepRecipeWithGallery}
                            setInstantStepRecipeWithGallery={setInstantStepRecipeWithGallery}/>
              </ul>
            )
          )}
        </li>
        <ButtonBasic color={'secondaryGreen'} text={'Добавить шаг'} onClick={() => handleAddStep()}/>
        <div className={style.addRecipe__button}>
          <ButtonBasic color={'primaryGreen'} text={'Отправить на модерацию'}/>
        </div>
        {/*  <PopupBasic title={"Удалить рецепт?"} text={'Вы действительно хотите удалить рецепт «Булочки синнабон с корицей»?'}/>*/}

      </div>
      {/*
      <div  className={style.addRecipe__imagePepper}/>
      <div  className={style.addRecipe__imageGarlic}/>
      <div  className={style.addRecipe__imageTomato}/>*/}
    </section>
  )
}

export default AddRecipe
