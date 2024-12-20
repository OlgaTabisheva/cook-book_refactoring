import style from "./RecipePhotoBlock.module.scss";
import test from "../../assets/test.jpg";
import ButtonLikeFull from "../../shared/Buttons/ButtonLike/ButtonLikeFull.jsx";
import ButtonComments from "../../shared/Buttons/ButtonComments/ButtonComments.jsx";
import { ReactComponent as User } from "../../assets/user.svg";
import StepByStep from "../StepByStep/StepByStep.jsx";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ButtonImgOpenGallery from "../../shared/Buttons/ButtonImgOpenGallery/ButtonImgOpenGallery.jsx";
import PopupImageGallery from "../Popup/PopupImageGallery/PopupImageGallery.jsx";
import { gql, useQuery } from "@apollo/client";
import { defaultAvatar } from "../../utils/Utils.js";
import RecipeComposition from "../RecipeComposition/RecipeComposition.jsx";

function RecipePhotoBlock({
  instantAddRecipe,
  recipeStepsMap,
  recipeCompositionMap,
  fullRecipeFromFullRecipe,
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [openImagePopup, setOpenImagePopup] = useState(false);
  const [recipeStepsMapSlice, setRecipeStepsMapSlice] = useState(false);
  const [recipeStepsMapSliceForButton, setRecipeStepsMapSliceForButton] =
    useState(false);
  const [fullRecipe, setFullRecipe] = useState();
  const [countLikes, setCountLikes] = useState([]);
  const [countComments, setCountComments] = useState([]);
  const [RecipesAddition, setRecipesAddition] = useState();
  const [usePhoto, setUsePhoto] = useState();

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
  const GET_RECIPE_AUTHOR = gql`
query MyQuery {
  recipes_by_pk(id: "${id}") {
    authorId
    date
    user {
      avatarUrl
      displayName
    }
  }
  }
`;
  const getCountsLikes = useQuery(GET_COUNTS_LIKES).data;
  const getCountsComments = useQuery(GET_COUNTS_COMMENTS).data;
  const getRecipesAuthor = useQuery(GET_RECIPE_AUTHOR)?.data?.recipes_by_pk;

  useEffect(() => {
    setRecipesAddition(getRecipesAuthor);
  }, [getRecipesAuthor]);
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
    setRecipeStepsMapSlice(recipeStepsMap?.slice(0, 4));
    setRecipeStepsMapSliceForButton(recipeStepsMap?.slice(4, 5));
  }, [recipeStepsMap]);
  useEffect(() => {
    setFullRecipe(instantAddRecipe?.recipes?.find((elem) => elem?.id === id));
  }, [instantAddRecipe]);
  const formatDate = (date) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(date).toLocaleString(undefined, options);
  };

  useEffect(() => {
    if (fullRecipe?.photo.length > 0) {
      setUsePhoto(JSON.parse(fullRecipe?.photo)?.url);
    }
  }, [fullRecipe]);

  return (
    <div className={style.recipePhotoBlock}>
      <PopupImageGallery
        open={openImagePopup}
        setOpenImagePopup={setOpenImagePopup}
        recipeStepsMap={recipeStepsMap}
      />

      <div className={style.recipePhotoBlock__recipe}>
        <div className={style.recipePhotoBlock__boxMaxi}>
          <img
            className={style.recipePhotoBlock__img}
            src={usePhoto ? usePhoto : fullRecipe?.photo}
            alt={"photo"}
          />
          <div className={style.recipePhotoBlock__boxMini}>
            {recipeStepsMapSlice &&
              recipeStepsMapSlice?.map((obj) => (
                <img
                  className={style.recipePhotoBlock__imgMini}
                  key={obj?.id}
                  src={obj?.url ? obj?.url : test}
                  alt={"photo"}
                />
              ))}

            {recipeStepsMapSliceForButton &&
              recipeStepsMapSliceForButton?.map((obj) => (
                <ButtonImgOpenGallery
                  key={obj?.id}
                  Imagebutton={obj?.url ? obj?.url : test}
                  onClick={() => setOpenImagePopup(!openImagePopup)}
                />
              ))}
          </div>
          <div className={style.recipePhotoBlock__box}>
            <div className={style.recipePhotoBlock__buttons}>
              <div className={style.recipePhotoBlock__like}>
                <div className={style.recipePhotoBlock__heart}></div>
                <div className={style.recipePhotoBlock__count}>{countLikes}</div>
              </div>
              <div className={style.recipePhotoBlock__like}>
      <div
        className={style.recipePhotoBlock__comments}></div>
      <div className={style.recipePhotoBlock__count}>{countComments}</div>
    </div>
            </div>
            <div className={style.recipePhotoBlock__module}>
              <div className={style.recipePhotoBlock__userBox}>
                <p className={style.recipePhotoBlock__text}>
                  {RecipesAddition?.user?.displayName}
                </p>
                <p className={style.recipePhotoBlock__text}>
                  {formatDate(RecipesAddition?.date)}
                </p>
              </div>
              <div className={style.recipePhotoBlock__boxPhoto}>
                {!RecipesAddition?.user?.avatarUrl?.includes(defaultAvatar) ? (
                  <img
                    className={style.recipePhotoBlock__imgUser}
                    src={RecipesAddition?.user?.avatarUrl}
                    alt={"user photo"}
                  />
                ) : (
                  <User className={style.recipePhotoBlock__user} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={style.recipePhotoBlock__composition_mobile}>
        <RecipeComposition
          fullRecipeFromFullRecipe={fullRecipeFromFullRecipe}
          recipeCompositionMap={recipeCompositionMap}
        />
      </div>
      <div className={style.recipePhotoBlock__description}>
        {fullRecipe?.description}
      </div>
      <div className={style.recipePhotoBlock__steps}>
        <h3 className={style.recipePhotoBlock__title}>
          Пошаговое приготовление
        </h3>
        {recipeStepsMap &&
          recipeStepsMap?.map((obj) => <StepByStep obj={obj} key={obj?.id} />)}
      </div>
    </div>
  );
}

export default RecipePhotoBlock;
