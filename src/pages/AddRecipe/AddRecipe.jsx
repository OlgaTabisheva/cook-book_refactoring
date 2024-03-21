import style from './AddRecipe.module.scss'
import HeaderMini from "../../widgets/HeaderMini/HeaderMini.jsx";
import InputAuth from "../../shared/InputAuth/InputAuth.jsx";
import ProductQuantity from "../../widgets/ProductQuantity/ProductQuantity.jsx";
import ImageBlur from "../../widgets/ImageBlur/ImageBlur.jsx";
import test from './../../assets/test.jpg'
import ButtonChips from "../../shared/Buttons/ButtonChips/ButtonChips.jsx";
import ButtonBasic from "../../shared/Buttons/ButtonBasic/ButtonBasic.jsx";
import RecipeStep from "../../widgets/RecipeStep/RecipeStep.jsx";
import {useEffect, useState} from "react";
import PopupBasic from "../../widgets/Popup/PopupBasic/PopupBasic.jsx";
import CategoryList from "../../widgets/CategoryList/CategoryList.jsx";
import AddPhotoRecipe from "../../widgets/AddPhotoRecipe/AddPhotoRecipe.jsx";
import { FileUploader } from "react-drag-drop-files";
import { useCounter } from "@uidotdev/usehooks";


function AddRecipe({allCategories, allDuration, setChosenTextCategory, chosenTextCategory}) {



  const [productUnitQuantity, setProductUnitQuantity] = useState(
    [{
      product: '',
      unit: '',
      quantity: '',
    }]
  )

  const [file, setFile] = useState(null);
  const [chosenTextDuration, setChosenTextDuration] = useState('')

  const [lineNumber, setLineNumber] = useState(1)
 const [productQuantityMap, setProductQuantityMap] = useState([{ number:lineNumber, product: 'первый',unit: 'первый',  count: 'первый'}])
  const [stepsRecipes, setStepsRecipes] = useState([  { text:'Все продукты, кроме молока, подготовить и оставить при комнатной температуре не меньше, чем на 30 минут. Растопить сливочное масло.\n' +
        ' \n' +
      'Молоко подогреваем до температуры 35–40°C. Заливаем дрожжи. В молоко добавляем пару ложек сахара. Перемешиваем. Накрываем полотенцем и убираем в сторону минут на 10.\n' +
      'В большую миску просеиваем муку, добавляем сахар, соль. Перемешиваем. В центре делаем углубление. Добавляем яйца комнатной температуры, готовые активные дрожжи (над молоком с дрожжами должна образоваться «шапка») и растопленное масло.\n' +
      'С помощью лопатки все перемешиваем. Затем замешиваем руками до момента, пока тесто не станет немного отставать от рук и стенок миски, но по-прежнему будет достаточно липким. Старайтесь муки не добавлять, так как чем ее больше, тем плотнее будут булочки',
    image:test, numberStep:1}])
  function handleDuration(obj) {
    setChosenTextDuration(obj)
  }

  function handleAddProduct() {
    const newLineNumber = lineNumber+1
    setProductQuantityMap(() => [...productQuantityMap, {number:newLineNumber,product: `Введите продукт`,unit: 'ед.изм' ,  count: 'вес'}])
    setLineNumber(newLineNumber)

    console.log()
  }
  function handleAddStep() {

    setStepsRecipes(() => [...stepsRecipes, {text: `Введите продукт`,image: 'ед.изм' ,  numberStep: 1 }])

  }

  return (
    <section className={style.addRecipe}>
      <HeaderMini color={'SandColorful10'}/>
      <div className={style.addRecipe__box}>
        <div className={style.addRecipe__boxName}>
          <h2 className={style.addRecipe__title}>Редактирование рецепта</h2>
          <InputAuth title={'Название рецепта'} text={'Булочки синабонн с корицей и сахарной пудрой'}/>
        </div>
       <CategoryList allCategories={allCategories} chosenTextCategory={chosenTextCategory} setChosenTextCategory={setChosenTextCategory}/>
        <div className={style.addRecipe__photoBox}>
        <h3 className={style.addRecipe__subtitle}>Фото готового блюда:</h3>
        <AddPhotoRecipe file={file} setFile={setFile}/>

        {/*<ImageBlur image={test}/>*/}</div>

        <div className={style.addRecipe__cover}>
          <h3 className={style.addRecipe__subtitle}>Длительность приготовления:</h3>
          <div className={style.addRecipe__boxCategory}>
            {allDuration?.duration?.map((obj) => (
              <ButtonChips text={obj ? obj.duration : ''} onClick={()=>handleDuration(obj)} chosenText={chosenTextDuration.duration}></ButtonChips>
            ))}
          </div>
        </div>
        <div className={style.addRecipe__quantity}>
          <h3 className={style.addRecipe__subtitle}>Состав:</h3>

          {productQuantityMap?.map((obj) => (<ProductQuantity
            setProductUnitQuantity={setProductUnitQuantity}
            productUnitQuantity={productUnitQuantity}
            obj={obj}
            setProductQuantityMap={setProductQuantityMap}
            productQuantityMap={productQuantityMap}/>)
          )}


        </div>
        <ButtonBasic color={'secondaryGreen'} text={'Добавить продукт'} onClick={()=>handleAddProduct()}/>
        <div className={style.addRecipe__steps}>
          <h3 className={style.addRecipe__subtitleLeft}>Пошаговое приготовление:</h3>
          <div className={style.addRecipe__boxSteps}>
            {stepsRecipes?.map((obj) => (<RecipeStep  obj={obj} setStepsRecipes={setStepsRecipes} stepsRecipes={stepsRecipes}/>)
            )}


          </div>
        </div>
        <ButtonBasic color={'secondaryGreen'} text={'Добавить шаг'} onClick={()=>handleAddStep()}/>
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
