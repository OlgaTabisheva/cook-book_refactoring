import style from './AdminPage.module.scss'
import icon from './../../assets/IconEdit.svg'
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import CategoryCard from "../../widgets/CategoryCard/CategoryCard.jsx";
import ButtonBasic from "../../shared/Buttons/ButtonBasic/ButtonBasic.jsx";
import ButtonBack from "../../shared/Buttons/ButtonBack/ButtonBack.jsx";
import InputSearch from "../../shared/InputSearch/InputSearch.jsx";
import {gql, useQuery} from "@apollo/client";
import RecipeCard from "../../widgets/RecipeCard/RecipeCard.jsx";
import UserTableLine from "../../widgets/UserTableLine/UserTableLine.jsx";

function AdminCard({allCategories}) {

  const [instantNotPublishRecipe, setInstantNotPublishRecipe] = useState([])
  const [instantPublishRecipe, setInstantPublishRecipe] = useState([])
  const [instantUsers, setInstantUsers] = useState([])

  const GET_RECIPES_NOT_PUBLISH = gql`
  query MyQuery {
  recipes(where: {publish: {_eq: false}}) {
       category {
      category
    }
   duration {
      duration
    }
      id
      date
      name
      food
      description
      photo
      steps
        publish
      portions
  }
}
`
  const GET_RECIPES_PUBLISH = gql`
  query MyQuery {
  recipes(where: {publish: {_eq: true}}) {
       category {
      category
    }
   duration {
      duration
    }
      id
      date
      name
      food
      description
      photo
      steps
  }
}
`
  const GET_USER_PROP = gql`
query MyQuery {
  users {
    avatarUrl
    email
    displayName
    disabled
  }
}

`
  const {data} = useQuery(GET_RECIPES_NOT_PUBLISH)
  const publish = useQuery(GET_RECIPES_PUBLISH)?.data
  const usersProp = useQuery(GET_USER_PROP)?.data

  useEffect(() => {
    setInstantNotPublishRecipe(data)
  }, [data])

  useEffect(() => {
    setInstantPublishRecipe(publish)
  }, [publish])

  useEffect(() => {
    setInstantUsers(usersProp)
  }, [usersProp])

  let location = useLocation();
  let searchTextFromRoute = decodeURI(location.pathname.slice(7))

  return (
    <section
      className={style.adminPage}>
      <ButtonBack/>
      <div className={style.adminPage__box}>
        <h2 className={style.adminPage__title}>{searchTextFromRoute}</h2>
        <p className={style.adminPage__text}>5 {searchTextFromRoute}</p>
      </div>
      {searchTextFromRoute === 'Категории' &&
        <div className={style.adminPage__boxCategories}>
          <div className={style.adminPage__categories}>
            {allCategories?.categories?.map((obj,i) => (
              <CategoryCard key={i} {...obj}/>))}
          </div>

          <ButtonBasic color={'primaryGreen'} text={'Добавить'}/>
        </div>
      }
      {searchTextFromRoute === 'На модерации' &&
        <div className={style.adminPage__boxMod}>
          <InputSearch placeholder={'Ведите название'}/>
          <div className={style.adminPage__mod}>

            {instantNotPublishRecipe?.recipes?.map((obj) => (
              <RecipeCard key={obj.id} {...obj}
                          isBtnLike={false} isBtnComments={false}
              />))}
          </div>

        </div>
      }
      {searchTextFromRoute === 'Опубликованные' &&
        <div className={style.adminPage__boxMod}>
          <InputSearch placeholder={'Ведите название'}/>
          <div className={style.adminPage__mod}>

            {instantPublishRecipe?.recipes?.map((obj,i) => (
              <RecipeCard key={i} {...obj}/>))}
          </div>

        </div>
      }
      {searchTextFromRoute === 'Пользователи' &&
        <div className={style.adminPage__boxTable}>
          <InputSearch placeholder={'Введите имя или почту'}/>
          <div className={style.adminPage__table}>
            <div className={style.adminPage__tableTitle}>
              <p className={style.adminPage__tableText}>Имя</p>
              <p className={style.adminPage__tableText}>Почта</p>
              <p className={style.adminPage__tableTextLast}>Действие</p>
            </div>

            {instantUsers?.users?.map((obj) => (
              <UserTableLine {...obj}/>))}

          </div>

        </div>
      }
    </section>
  )
}

export default AdminCard
