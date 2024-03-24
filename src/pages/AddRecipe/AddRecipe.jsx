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
import {useNavigate, useParams} from "react-router-dom";
import {useUserData} from "@nhost/react";
import {gql, useMutation} from "@apollo/client";
import {toast} from "react-hot-toast";


function AddRecipe({allCategories, allDuration}) {
  const {id} = useParams();
  const navigate = useNavigate();
  const user = useUserData()
 // const fullRecipe = instantAddRecipe?.recipes.find(elem => elem.id === id);

  const UPDATE_RECIPE = gql`
mutation UpdateRecipe( $id: uuid = "${id}", $recipes_category: smallint!, $description: String!, $food: String!, $long: smallint!, $name: String!, $photo: String!) {
  update_recipes_by_pk(pk_columns: {id: $id}, _set: {recipes_category: $recipes_category, description: $description, food: $food, long: $long, name: $name, photo: $photo})
 {
      recipes_category
      description
      food
      long
      name
      photo
      
    }
}`
  const [mutateRecipe] = useMutation(UPDATE_RECIPE)


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
const [nameRecipe,setNameRecipe]=useState()
  const [fullNewRecipe, setFullNewRecipe]=useState({})
  const [instantAddRecipe, setInstantAddRecipe]= useState()
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
    setFullNewRecipe({
      name:nameRecipe,
      category: chosenTextCategory.category,
      url: mainRecipeImage,
      duration: chosenTextDuration.duration,
      products: productQuantityMap,
      steps: instantStepRecipeWithGallery
    })
    localStorage.setItem('fullNewRecipe', JSON.stringify(fullNewRecipe))
  }, [nameRecipe,chosenTextCategory,mainRecipeImage,chosenTextDuration,productQuantityMap,instantStepRecipeWithGallery])


  const updateRecipe = async (e) => {
    e.preventDefault()


    try {
      await mutateRecipe({
        variables: {
          id: id,
          recipes_category: chosenTextCategory?.number,
          food: JSON.stringify(productQuantityMap),
          long:JSON.stringify( chosenTextDuration?.number),
          name: nameRecipe,
          photo: mainRecipeImage,
          description: JSON.stringify(instantStepRecipeWithGallery),
        }

      }).then((rez) => {
        const recipesArray = [
          ...instantAddRecipe, {
            recipes_category: rez.data.update_recipes_by_pk.category,
            name: rez.data.update_recipes_by_pk.name,
            photo: rez.data.update_recipes_by_pk.photo,
            description: rez.data.update_recipes_by_pk.description,
            food: rez.data.update_recipes_by_pk.food,
            long: rez.data.update_recipes_by_pk.long,
          }]

        setInstantAddRecipe({recipes: recipesArray})
      })
      toast.success('Обновленно успешно!');
      navigate("/recipes")
    } catch (error) {
      toast.error('Произошла ошибка')
    }
  }



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
      <form className={style.addRecipe__box} onSubmit={updateRecipe}>
        <div className={style.addRecipe__boxName}>
          <h2 className={style.addRecipe__title}>Редактирование рецепта</h2>
          <InputAuth title={'Название рецепта'} placeholder={'Булочки синабонн с корицей и сахарной пудрой'} value={nameRecipe} onChange={(e)=>setNameRecipe(e.target.value)}/>
        </div>
        <CategoryList allCategories={allCategories} chosenTextCategory={chosenTextCategory.category}
                      setChosenTextCategory={setChosenTextCategory}/>
        <div className={style.addRecipe__photoBox}>
          <h3 className={style.addRecipe__subtitle}>Фото готового блюда:</h3>
          {!mainRecipeImage ?
            <AddPhotoRecipe mainRecipeImage={mainRecipeImage} setMainRecipeImage={setMainRecipeImage}/>
            :
            <ImageBlur image={mainRecipeImage}/>}</div>


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
          <ButtonBasic color={'primaryGreen'} text={'Отправить на модерацию'}  type='submit'/>
        </div>
        {/*  <PopupBasic title={"Удалить рецепт?"} text={'Вы действительно хотите удалить рецепт «Булочки синнабон с корицей»?'}/>*/}

      </form>
      {/*
      <div  className={style.addRecipe__imagePepper}/>
      <div  className={style.addRecipe__imageGarlic}/>
      <div  className={style.addRecipe__imageTomato}/>*/}
    </section>
  )
}

export default AddRecipe
