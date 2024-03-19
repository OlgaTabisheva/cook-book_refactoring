import style from './AddRecipeStep1.module.scss'
import React from 'react';
import HeaderMini from "../../widgets/HeaderMini/HeaderMini.jsx";
import InputAuth from "../../shared/InputAuth/InputAuth.jsx";
import CategoryList from "../../widgets/CategoryList/CategoryList.jsx";
import ButtonBasic from "../../shared/Buttons/ButtonBasic/ButtonBasic.jsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useUserData} from "@nhost/react";
import {gql, useMutation} from "@apollo/client";
import {toast} from "react-hot-toast";
function AddRecipeStep1({  setInstantAddRecipe,
                          instantAddRecipe,
                          allCategories,
                          setFormValuesRecipe,
                          formValuesRecipe}) {

  const [chosenTextCategory, setChosenTextCategory] = useState('')
  const navigate = useNavigate();
  const user = useUserData()
  const handleInputChange = React.useCallback((e) => {
    const {id, value} = e.target;
    setFormValuesRecipe(prevState => ({...prevState, [id]: value}));
  }, [setFormValuesRecipe])
  const [formValidityAddRecipe, setFormValidityAddRecipe] = React.useState({
    nameValid: false,
    categoryValid: false,
  });
  const {nameValid, categoryValid} = formValidityAddRecipe;
  const isSubmitDisabled = !nameValid || !categoryValid;


  const ADD_RECIPE = gql`
mutation AddRecipe( $recipes_category: smallint!, $name: String!, $authorId: uuid!) {
  insert_recipes_one(object: {name: $name, recipes_category:$recipes_category, authorId:$authorId})
   {
   id
   name
   recipes_category
   authorId
  }
}`
  const [addNewRecipe, {error: ErrorAddRecipe}] = useMutation(ADD_RECIPE)


  React.useEffect(function validateInputs() {

    const isRecipeName = formValuesRecipe.name.length >= 3
    const isRecipeCategory = chosenTextCategory.number  > 0
    setFormValidityAddRecipe(prevValidity => ({
      nameValid: isRecipeName,
      categoryValid: isRecipeCategory,

    }))
  }, [formValuesRecipe])
  const addRecipe = async (e) => {
    e.preventDefault()
    try {
      await addNewRecipe({
        variables: {
          recipes_category: chosenTextCategory.number,
          name: formValuesRecipe.name,
          id: formValuesRecipe.id,
          authorId: user.id,
        }
      }).then((rez) => {
          const recipesArray = [
            ...instantAddRecipe.recipes, {
              id: rez.data.insert_recipes_one.id,
              recipes_category: rez.data.insert_recipes_one.category,
              name: rez.data.insert_recipes_one.name,
              authorId: rez.data.insert_recipes_one.authorId,
            }]
          setInstantAddRecipe({recipes: recipesArray})
          navigate(`/add-recipe/${rez.data.insert_recipes_one.id}`)
        }
      )
    } catch (error) {
      toast.error('Произошла ошибка')
    }
  }


  return (
    <form className={style.addRecipeStep1} onSubmit={addRecipe}>
      <HeaderMini color={'SandColorful10'}/>
<div className={style.addRecipeStep1__box}>
  <h3 className={style.addRecipeStep1__title}>Создать рецепт</h3>
  <InputAuth errorText={'ghbdtn'} title={'Название рецепта'} text={'Введите текст'} id="name" name={'emailInput'} onChange={ handleInputChange}  value={formValuesRecipe?.name}/>
  <CategoryList allCategories={allCategories} chosenTextCategory={chosenTextCategory} setChosenTextCategory={setChosenTextCategory}/>
  <ButtonBasic color={'primaryGreen'} text={'Далее'} type={'submit'} disabled={isSubmitDisabled}/>
</div>
    </form>
  )
}

export default AddRecipeStep1