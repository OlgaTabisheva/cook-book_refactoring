import style from './RecipeCard.module.scss'
import RecipeChips from "../../shared/RecipeChips/RecipeChips.jsx";
import recipeClock from "../../assets/clock 16.svg";
import img from "../../assets/test.jpg";
import ButtonLike from "../../shared/Buttons/ButtonLike/ButtonLikeEmpty.jsx";
import ButtonComments from "../../shared/Buttons/ButtonComments/ButtonComments.jsx";
import ButtonLikeFull from "../../shared/Buttons/ButtonLike/ButtonLikeFull.jsx";
import ButtonLikeEmpty from "../../shared/Buttons/ButtonLike/ButtonLikeEmpty.jsx";
import {useEffect, useState} from "react";
import {useUserData} from "@nhost/react";
import {gql, useMutation, useQuery} from "@apollo/client";

function RecipeCard({
                      name,
                      category,
                      photo,
                      id,
                      instantLikes,
                      setInstantLikes,
                      long,
                      isAuthenticated,
                      isBtnLike = true,
                      isBtnEdit = true,
                      isBtnComments = true
                    }) {
  const [changeLike, setChangeLike] = useState(false)
  const [countLikes, setCountLikes] = useState([])
  const [countComments, setCountComments] = useState([])
  const user = useUserData()
  const GET_COUNTS_LIKES = gql`
  query {
  likes_aggregate(where: {recipesId: {_eq: "${id}"}}) {
    aggregate {
      count
    }
  }
}
`
  const GET_COUNTS_COMMENTS = gql`
  query {
    comments_aggregate(where: {recipe: {id:{_eq: "${id}"}}}){
      aggregate {
        count
      }
    }
  }
`

  const ADD_LIKE =
    gql`
  mutation {
    insert_likes_one(object: {userId: "${user?.id}", recipesId:"${id}"}) {
      recipesId
    }
  }`


  const DELETE_LIKE = gql`
  mutation{
  delete_likes_by_pk(recipesId:"${id}", userId: "${user?.id}") {
    recipesId
    userId
  }
}
  `
  const [addLikes] = useMutation(ADD_LIKE)
  const [deleteLikes] = useMutation(DELETE_LIKE)
  const getCountsLikes = useQuery(GET_COUNTS_LIKES).data
  const getCountsComments = useQuery(GET_COUNTS_COMMENTS).data
  useEffect(() => {
    if (getCountsLikes?.likes_aggregate.aggregate.count !== undefined) {
      setCountLikes(getCountsLikes?.likes_aggregate.aggregate.count)
    }
  }, [getCountsLikes])

  useEffect(() => {

    if (getCountsComments?.comments_aggregate.aggregate.count !== undefined) {
      setCountComments(getCountsComments?.comments_aggregate.aggregate.count)

    }

  }, [getCountsComments])


  function handleClickLike(id) {

    if (instantLikes?.some(t => t.recipesId === id)) {
      //del likes
      let tmp = instantLikes.filter(o => o.recipesId !== id);
      setCountLikes(countLikes - 1)
      deleteLikes().then(
        setInstantLikes(tmp)
      ).catch((err) => {
        console.log(err, 'DelErr')
      })
    } else {
      setCountLikes(countLikes + 1)
      addLikes({
        variables: {
          recipesId: id,
        }
      }).then(
        setInstantLikes(() => [...instantLikes, {__typename: 'likes', recipesId: id, userId: user.id}]))
        .catch((err) => {
          console.log(err, 'AddErr')
        })
    }

  }

  return (
    <section className={style.recipeCard}>
      <div className={style.recipeCard__imgBox}>
        <RecipeChips text={category.category}/>
        <img className={style.recipeCard__img}
             src={photo ? photo : img} alt="recipeImg"/>
      </div>
      <div className={style.recipeCard__textBox}>
        <h3 className={style.recipeCard__name}>{name}</h3>
        <p className={style.recipeCard__text}>Марина Иванова</p>
        <div className={style.recipeCard__clock}>
          <img className={style.recipeCard__imgClock}
               src={recipeClock} alt="clock"/>
          <p className={style.recipeCard__text}>{long}</p>
        </div>
      </div>
      <div className={style.recipeCard__box}>
        {changeLike === true ?
          <ButtonLikeFull handleClickLike={handleClickLike} countLikes={countLikes }setChangeLike={setChangeLike} changeLike={changeLike}/> :
          <ButtonLikeEmpty handleClickLike={handleClickLike} countLikes ={countLikes} setChangeLike={setChangeLike} changeLike={changeLike}/>}
        <ButtonComments countComments={countComments}/>
      </div>

    </section>
  )
}

export default RecipeCard