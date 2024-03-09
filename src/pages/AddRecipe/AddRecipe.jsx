import style from './AddRecipe.module.scss'
import HeaderMini from "../../widgets/HeaderMini/HeaderMini.jsx";
import InputAuth from "../../shared/InputAuth/InputAuth.jsx";
import ProductQuantity from "../../widgets/ProductQuantity/ProductQuantity.jsx";
import ImageBlur from "../../widgets/ImageBlur/ImageBlur.jsx";
import test from './../../assets/test.jpg'
import ButtonChips from "../../shared/Buttons/ButtonChips/ButtonChips.jsx";
import ButtonBasic from "../../shared/Buttons/ButtonBasic/ButtonBasic.jsx";
import RecipeStep from "../../widgets/RecipeStep/RecipeStep.jsx";
import {useState} from "react";


function AddRecipe({allCategories, allDuration}) {





  return (
    <section className={style.addRecipe}>
      <HeaderMini/>
      <div className={style.addRecipe__box}>
        <div className={style.addRecipe__boxName}>
          <h2 className={style.addRecipe__title}>Редактирование рецепта</h2>
          <InputAuth title={'Название рецепта'} text={'Булочки синабонн с корицей и сахарной пудрой'}/>
        </div>
        <div className={style.addRecipe__cover}>
          <h3 className={style.addRecipe__subtitle}>Категория блюда:</h3>
          <div className={style.addRecipe__boxCategory}>
            {allCategories?.categories?.map((obj) => (
              <ButtonChips text={obj ? obj.category : ''}></ButtonChips>
            ))}
          </div>
        </div>
        <h3 className={style.addRecipe__subtitle}>Фото готового блюда:</h3>
        <ImageBlur image={test}/>
        <div className={style.addRecipe__cover}>
          <h3 className={style.addRecipe__subtitle}>Длительность приготовления:</h3>
          <div className={style.addRecipe__boxCategory}>
            {allDuration?.duration?.map((obj) => (
              <ButtonChips text={obj ? obj.duration : ''}></ButtonChips>
            ))}
          </div>
        </div>
        <div className={style.addRecipe__quantity}>
          <h3 className={style.addRecipe__subtitle}>Состав:</h3>
          <ProductQuantity/>
          <ProductQuantity/>

          <ProductQuantity/>

          <ProductQuantity/>


        </div>
        <ButtonBasic color={'secondaryGreen'} text={'Добавить продукт'}/>
        <div className={style.addRecipe__steps}>
          <h3 className={style.addRecipe__subtitleLeft}>Пошаговое приготовление:</h3>
          <div className={style.addRecipe__boxSteps}>
          <RecipeStep
            text={'Все продукты, кроме молока, подготовить и оставить при комнатной температуре не меньше, чем на 30 минут. Растопить сливочное масло.\n' +
              ' \n' +
              'Молоко подогреваем до температуры 35–40°C. Заливаем дрожжи. В молоко добавляем пару ложек сахара. Перемешиваем. Накрываем полотенцем и убираем в сторону минут на 10.\n' +
              'В большую миску просеиваем муку, добавляем сахар, соль. Перемешиваем. В центре делаем углубление. Добавляем яйца комнатной температуры, готовые активные дрожжи (над молоком с дрожжами должна образоваться «шапка») и растопленное масло.\n' +
              'С помощью лопатки все перемешиваем. Затем замешиваем руками до момента, пока тесто не станет немного отставать от рук и стенок миски, но по-прежнему будет достаточно липким. Старайтесь муки не добавлять, так как чем ее больше, тем плотнее будут булочки'}
            image={test} numberStep={1}/>
          <RecipeStep
            text={'Все продукты, кроме молока, подготовить и оставить при комнатной температуре не меньше, чем на 30 минут. Растопить сливочное масло.\n' +
              ' \n' +
              'Молоко подогреваем до температуры 35–40°C. Заливаем дрожжи. В молоко добавляем пару ложек сахара. Перемешиваем. Накрываем полотенцем и убираем в сторону минут на 10.\n' +
              'В большую миску просеиваем муку, добавляем сахар, соль. Перемешиваем. В центре делаем углубление. Добавляем яйца комнатной температуры, готовые активные дрожжи (над молоком с дрожжами должна образоваться «шапка») и растопленное масло.\n' +
              'С помощью лопатки все перемешиваем. Затем замешиваем руками до момента, пока тесто не станет немного отставать от рук и стенок миски, но по-прежнему будет достаточно липким. Старайтесь муки не добавлять, так как чем ее больше, тем плотнее будут булочки'}
            image={test} numberStep={2}/>
          <RecipeStep
            text={'Все продукты, кроме молока, подготовить и оставить при комнатной температуре не меньше, чем на 30 минут. Растопить сливочное масло.\n' +
              ' \n' +
              'Молоко подогреваем до температуры 35–40°C. Заливаем дрожжи. В молоко добавляем пару ложек сахара. Перемешиваем. Накрываем полотенцем и убираем в сторону минут на 10.\n' +
              'В большую миску просеиваем муку, добавляем сахар, соль. Перемешиваем. В центре делаем углубление. Добавляем яйца комнатной температуры, готовые активные дрожжи (над молоком с дрожжами должна образоваться «шапка») и растопленное масло.\n' +
              'С помощью лопатки все перемешиваем. Затем замешиваем руками до момента, пока тесто не станет немного отставать от рук и стенок миски, но по-прежнему будет достаточно липким. Старайтесь муки не добавлять, так как чем ее больше, тем плотнее будут булочки'}
            image={test} numberStep={3}/>
          </div>
        </div>
        <ButtonBasic color={'secondaryGreen'} text={'Добавить шаг'}/>
        <div className={style.addRecipe__button}>
          <ButtonBasic color={'primaryGreen'} text={'Отправить на модерацию'}/>
        </div>

      </div>


    </section>
  )
}

export default AddRecipe
