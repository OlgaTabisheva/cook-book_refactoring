import style from "./RecipeCard.module.scss";
import RecipeChips from "../../shared/RecipeChips/RecipeChips.jsx";
import img from "../../assets/Spiner.svg";
//import img from "../../assets/test.jpg";
import ButtonComments from "../../shared/Buttons/ButtonComments/ButtonComments.jsx";
import ButtonLikeFull from "../../shared/Buttons/ButtonLike/ButtonLikeFull.jsx";
import ButtonLikeEmpty from "../../shared/Buttons/ButtonLike/ButtonLikeEmpty.jsx";
import { useEffect, useState } from "react";
import { useUserData } from "@nhost/react";
import { gql, useMutation, useQuery } from "@apollo/client";
import BoxClockTime from "../../shared/BoxClockTime/BoxClockTime.jsx";
import { Link } from "react-router-dom";

function RecipeCard({
  name,
  category,
  photo,
  id,
  instantLikes,
  setInstantLikes,
  duration,
  user,
  publish,
  isAuthenticated,
  isBtnLike = true,
  isBtnEdit = true,
  isBtnComments = true,
  unauthorizedPopup,
  setUnauthorizedPopup,
}) {
  const [mainPhoto, setMainPhoto] = useState();
  const [countLikes, setCountLikes] = useState([]);
  const [countComments, setCountComments] = useState([]);
  const [likesForNonUsers,setLikesForNonUsers ] = useState([false,-1])

  const myUser = useUserData();

  const GET_COUNTS_LIKES = gql`
  query {
  likes_aggregate(where: {recipesId: {_eq: "${id}"}}) {
    aggregate {
      count
    }
  }
}
`;
  const GET_COUNTS_COMMENTS = gql`
  query {
    comments_aggregate(where: {recipe: {id:{_eq: "${id}"}}}){
      aggregate {
        count
      }
    }
  }
`;

  const ADD_LIKE = gql`
  mutation {countLikes
    insert_likes_one(object: {userId: "${myUser?.id}", recipesId:"${id}"}) {
      recipesId
    }
  }`;

  const DELETE_LIKE = gql`
  mutation{
  delete_likes_by_pk(recipesId:"${id}", userId: "${myUser?.id}") {
    recipesId
    userId
  }
}
  `;

  const [addLikes] = useMutation(ADD_LIKE);
  const [deleteLikes] = useMutation(DELETE_LIKE);
  const getCountsLikes = useQuery(GET_COUNTS_LIKES).data;
  const getCountsComments = useQuery(GET_COUNTS_COMMENTS).data;

  useEffect(() => {
    if (getCountsLikes?.likes_aggregate.aggregate.count !== undefined) {
      setCountLikes(getCountsLikes?.likes_aggregate.aggregate.count);
    }
  }, [getCountsLikes]);

  useEffect(() => {
    if (getCountsComments?.comments_aggregate.aggregate.count !== undefined) {
      setCountComments(getCountsComments?.comments_aggregate.aggregate.count);
    }
  }, [getCountsComments]);

  useEffect(() => {
    if (photo?.length > 50) {
      const temp = JSON.parse(photo)?.url;
      setMainPhoto(temp);
    }
  }, []);

  function handleClickLike(id) {
    if (instantLikes?.some((t) => t.recipesId === id)) {
      //del likes
      let tmp = instantLikes.filter((o) => o.recipesId !== id);
      setCountLikes(countLikes - 1);
      deleteLikes()
        .then(setInstantLikes(tmp))
        .catch((err) => {
          console.log(err, "DelErr");
        });
    } else {
      setCountLikes(countLikes + 1);
      addLikes({
        variables: {
          recipesId: id,
        },
      })
        .then(
          setInstantLikes(() => [
            ...instantLikes,
            { __typename: "likes", recipesId: id, userId: myUser.id },
          ])
        )
        .catch((err) => {
          console.log(err, "AddErr");
        });
    }
  }

  return (
    <section className={style.recipeCard}>
      {(publish === true || myUser?.defaultRole === "AdminRecipes") &&
        isBtnEdit && (
          <form className={style.recipeCard__form} action={`/add-recipe/${id}`}>
            <button className={style.recipeCard__more}></button>
          </form>
        )}
      {publish === false && myUser?.defaultRole !== "AdminRecipes" && (
        <div className={style.recipeCard__form}>
          <button className={style.recipeCard__del}></button>
        </div>
      )}
      {myUser?.defaultRole !== "AdminRecipes" && publish === false && (
        <div className={style.recipeCard__divMod}>На модерации</div>
      )}
      <Link to={`/recipe/${id}`} key={id} className={style.recipeCard__link}>
        <div className={style.recipeCard__imgBox}>
          <div>
            <RecipeChips text={category?.category} />
          </div>
          {mainPhoto ? (
            <img
              className={
                publish === false
                  ? style.recipeCard__imgBlur
                  : style.recipeCard__img
              }
              src={mainPhoto ? mainPhoto : img}
              alt="recipeImg"
            />
          ) : (
            <div className={style.recipeCard__coverLoading}>
              <img
                className={style.recipeCard__loading}
                src={img}
                alt="recipeImg"
              />
            </div>
          )}
        </div>

        <div className={style.recipeCard__textBox}>
          <h3 className={style.recipeCard__name}>{name}</h3>
          <p className={style.recipeCard__text}>{user?.displayName}</p>
          <BoxClockTime howLong={duration?.duration} />
        </div>
      </Link>
      <div className={style.recipeCard__box}>
        {isAuthenticated ? (
          instantLikes?.some((t) => t.recipesId === id) ? (
            <ButtonLikeFull
              onClick={() => handleClickLike(id)}
              countLikes={countLikes}
            />
          ) : (
            <ButtonLikeEmpty
              onClick={() => handleClickLike(id)}
              countLikes={countLikes}
            />
          )
        ) : ( (likesForNonUsers[0] === false ) ? 
          <ButtonLikeEmpty
            onClick={() => setLikesForNonUsers([true,countLikes+1])  }
            countLikes={(likesForNonUsers[1]>0) ? likesForNonUsers[1] : countLikes}
          /> : <ButtonLikeFull
          onClick={() => setLikesForNonUsers([false,countLikes-1]) }
          countLikes={(likesForNonUsers[1]>0) ? likesForNonUsers[1] : countLikes}
        /> 
        )}
        <ButtonComments countComments={countComments} />
      </div>
    </section>
  );
}

export default RecipeCard;
