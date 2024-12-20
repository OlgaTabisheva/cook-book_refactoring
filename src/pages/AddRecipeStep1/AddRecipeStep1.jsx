import style from './AddRecipeStep1.module.scss'
import React, {useEffect} from 'react';
import HeaderMini from "../../widgets/HeaderMini/HeaderMini.jsx";
import InputAuth from "../../shared/InputAuth/InputAuth.jsx";
import CategoryList from "../../widgets/CategoryList/CategoryList.jsx";
import ButtonBasic from "../../shared/Buttons/ButtonBasic/ButtonBasic.jsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useUserData} from "@nhost/react";
import {gql, useMutation} from "@apollo/client";
import {toast} from "react-hot-toast";

function AddRecipeStep1({
                          setInstantAddRecipe,
                          instantAddRecipe,
                          allCategories,
                          setFormValuesRecipe,
                          formValuesRecipe, chosenTextCategoryStep1, setChosenTextCategoryStep1
                        }) {


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
mutation AddRecipe( $recipes_category: smallint!, $name: String!, $authorId: uuid!, $publish: Boolean = false) {
  insert_recipes_one(object: {name: $name, recipes_category:$recipes_category,publish:$publish, authorId:$authorId})
   {
   id
   name
   recipes_category
   authorId
   publish
  }
}`


  const [addNewRecipe, {error: ErrorAddRecipe}] = useMutation(ADD_RECIPE)


  React.useEffect(function validateInputs() {

    const isRecipeName = formValuesRecipe?.name?.length > 3
    const isRecipeCategory = chosenTextCategoryStep1?.category?.length > 0

    setFormValidityAddRecipe(prevValidity => ({
      nameValid: isRecipeName,
      categoryValid: isRecipeCategory,

    }))
  }, [formValuesRecipe, chosenTextCategoryStep1])
  const addRecipe = async (e) => {
    e.preventDefault()
    try {
      await addNewRecipe({
        variables: {
          recipes_category: chosenTextCategoryStep1.number,
          name: formValuesRecipe.name,
          id: formValuesRecipe.id,
          authorId: user.id,
          portions: 1,
          publish: false
        }
      }).then((rez) => {

        const recipesArray = [
          ...instantAddRecipe.recipes, {
            id: rez.data.insert_recipes_one.id,
            portions: rez.data.insert_recipes_one.portions,
            recipes_category: rez.data.insert_recipes_one.recipes_category,
            name: rez.data.insert_recipes_one.name,
            authorId: rez.data.insert_recipes_one.authorId,
            publish: false
          }]
        setInstantAddRecipe({recipes: recipesArray})
        navigate(`/add-recipe/${rez?.data.insert_recipes_one.id}`)

      })
    } catch (error) {
      toast.error('Произошла ошибка')
    }
  }


  return (
    <form className={style.addRecipeStep1} onSubmit={addRecipe}>
      <HeaderMini color={'SandColorful10'}/>
      <div className={style.addRecipeStep1__box}>
        <h3 className={style.addRecipeStep1__title}>Создать рецепт</h3>
        <InputAuth error={!nameValid} errorText={'Название рецепта слишком короткое'} title={'Название рецепта'}
                   text={'Введите текст'} id="name" name={'emailInput'} onChange={handleInputChange}
                   value={formValuesRecipe?.name}/>
        <div className={style.addRecipeStep1__categoriesBox}>
          <CategoryList allCategories={allCategories} chosenTextCategory={chosenTextCategoryStep1.category}
                        setChosenTextCategory={setChosenTextCategoryStep1}/>
          {chosenTextCategoryStep1.category && <span
            className={!categoryValid ? style.addRecipeStep1__error : style.addRecipeStep1__errorHidden}
            id="error-category">Нужно выбрать категорию рецепта</span>}
        </div>
        <ButtonBasic color={'primaryGreen'} text={'Далее'} type={'submit'} disabled={isSubmitDisabled}/>
      </div>
    </form>
  )
}

export default AddRecipeStep1