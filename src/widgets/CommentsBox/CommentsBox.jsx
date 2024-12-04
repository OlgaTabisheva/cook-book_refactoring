import style from "./CommentsBox.module.scss";
import Comment from "../Comment/Comment.jsx";
import WriteComment from "../WriteComment/WriteComment.jsx";
import { useUserData, useUserDisplayName } from "@nhost/react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import ButtonBasic from "../../shared/Buttons/ButtonBasic/ButtonBasic.jsx";
import { useNavigate } from "react-router-dom";

function CommentsBox({
  instantComments,
  setInstantComments,
  isAuthenticated,
  instantLikesComments,
  setInstantLikesComments,
}) {
  const user = useUserData();
  const { id } = useParams();
  const userDisplayName = useUserDisplayName();
  const [textComment, setTextComment] = useState("");
  const commentEditText = false;
  const navigate = useNavigate();
  const ADD_COMMENT = gql`
mutation {
  insert_comments_one(object: {userId: "${user?.id}" recipeId: "${id}", text: "${textComment}"}) {
    userId
    recipeId
    text
    date
    
  }
}
`;
  const [addCommentsFromServer] = useMutation(ADD_COMMENT);
  let today = new Date().toLocaleString("en-US");

  function handleAddComments() {
    addCommentsFromServer({
      variables: {
        user: { displayName: userDisplayName },
        userId: user?.id,
        recipeId: id,
        text: textComment,
      },
    })
      .then((res) => {
        const commentsArray = [
          ...instantComments,
          {
            user: { displayName: userDisplayName },
            date: today,
            recipeId: res?.data?.insert_comments_one?.recipeId,
            text: res?.data?.insert_comments_one?.text,
          },
        ];
        setInstantComments(commentsArray);
      })
      .catch((err) => {
        console.log(err, "AddErr");
      });
  }

  function handleNavigate() {
    navigate(`/auth`);
  }

  return (
    <section className={style.commentsBox}>
      <h2 className={style.commentsBox__title}>Комментарии </h2>

      {(instantComments?.length>=1) ?
      (instantComments?.map((obj, index) => (
        <Comment
          key={index}
          {...obj}
          textComment={textComment}
          setTextComment={setTextComment}
          instantComments={instantComments}
          setInstantComments={setInstantComments}
          isAuthenticated={isAuthenticated}
          instantLikesComments={instantLikesComments}
          setInstantLikesComments={setInstantLikesComments}
          userId={user}
        />
      ))) : <div className={style.commentsBox__none}><p className={style.commentsBox__title}>Станьте первым, кто оценит этот рецепт!</p></div>}
      {isAuthenticated ? (
        <WriteComment
          handleAddComments={handleAddComments}
          setTextComment={setTextComment}
          textComment={textComment}
          commentEditText={commentEditText}
        />
      ) : (
        <div className={style.commentsBox__emptyBox}>
          <p className={style.commentsBox__smallTitle}>
          Хотите первыми поделиться своими впечатлениями? Тогда присоединяйтесь к нашему сообществу! Регистрация займет всего несколько секунд!
          </p>

          <ButtonBasic
            text={"Войти/Зарегистрироваться"}
            color={"primaryGreen"}
            onClick={handleNavigate}
          />
        </div>
      )}
    </section>
  );
}

export default CommentsBox;
