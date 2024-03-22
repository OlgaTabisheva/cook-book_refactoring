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



function AddRecipe({allCategories, allDuration}) {

  const [file, setFile] = useState(null);
  const [chosenTextDuration, setChosenTextDuration] = useState('')
  const [chosenTextCategory, setChosenTextCategory] = useState('')
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

  }
  useEffect(()=>{
    console.log(productQuantityMap, 'productQuantityMap')
  },[productQuantityMap])
  function handleAddStep() {
    setStepsRecipes(() => [...stepsRecipes, {text: `Введите `,image: 'ед.изм' ,  numberStep: 1 }])
  }

  return (
    <section className={style.addRecipe}>
      <HeaderMini color={'SandColorful10'}/>
      <div className={style.addRecipe__box}>
        <div className={style.addRecipe__boxName}>
          <h2 className={style.addRecipe__title}>Редактирование рецепта</h2>
          <InputAuth title={'Название рецепта'} text={'Булочки синабонн с корицей и сахарной пудрой'}/>
        </div>
       <CategoryList allCategories={allCategories} chosenTextCategory={chosenTextCategory.category} setChosenTextCategory={setChosenTextCategory}/>
        <div className={style.addRecipe__photoBox}>
        <h3 className={style.addRecipe__subtitle}>Фото готового блюда:</h3>
        <AddPhotoRecipe file={file} setFile={setFile}/>

        {/*<ImageBlur image={test}/>*/}</div>

        <div className={style.addRecipe__cover}>
          <h3 className={style.addRecipe__subtitle}>Длительность приготовления:</h3>
          <div className={style.addRecipe__boxCategory}>
            {allDuration?.duration?.map((obj) => (

              <ButtonChips  key = {obj.duration} text={obj ? obj.duration : ''} onClick={()=>handleDuration(obj)} chosenText={chosenTextDuration.duration}></ButtonChips>

            ))}
          </div>
        </div>
        <h3 className={style.addRecipe__subtitle}>Состав:</h3>
        <li className={style.addRecipe__quantity} key="tbody">
          {productQuantityMap?.map((obj) => (
            <ul  key = {obj.number} >
            <ProductQuantity
            obj={obj}
            setProductQuantityMap={setProductQuantityMap}
            productQuantityMap={productQuantityMap}/>
            </ul>))}
        </li>
        <ButtonBasic color={'secondaryGreen'} text={'Добавить продукт'} onClick={()=>handleAddProduct()}/>
        <div className={style.addRecipe__steps}>
          <h3 className={style.addRecipe__subtitleLeft}>Пошаговое приготовление:</h3>
            {stepsRecipes?.map((obj) => (
              <div className={style.addRecipe__boxSteps} key={obj.numberStep}>
              <RecipeStep  key = {obj.id} obj={obj} setStepsRecipes={setStepsRecipes} stepsRecipes={stepsRecipes}/>
              </div>
                )
            )}
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
