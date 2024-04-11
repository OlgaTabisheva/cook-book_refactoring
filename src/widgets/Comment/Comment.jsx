import style from './Comment.module.scss'
import {ReactComponent as User} from '../../assets/user.svg';
import ButtonLikeFull from "../../shared/Buttons/ButtonLike/ButtonLikeFull.jsx";
import {useEffect, useState} from "react";
import {gql, useMutation, useQuery} from "@apollo/client";
import CommentEdit from "../CommentEdit/CommentEdit.jsx";
import ButtonLikeEmpty from "../../shared/Buttons/ButtonLike/ButtonLikeEmpty.jsx";
import {useUserData} from "@nhost/react";


function Comment({
                   name,
                   text,
                   user,
                   date,
                   instantComments,
                   setInstantComments,
                   isAuthenticated,
                   userId, textComment, setTextComment, instantLikesComments, setInstantLikesComments
                 }) {
  const [updateTextComment, setUpdateTextComment] = useState()
  const [clickButton, setClickButton] = useState(true)
  const [countLikesComment, setCountLikesComment] = useState([])
  const userData = useUserData()
  const DELETE_COMMENT = gql`
  mutation  {
    delete_comments_by_pk(name: "${name}") {
      date
      name
      recipeId
      text
      userId
    }
  }
  `

  const [deleteComment] = useMutation(DELETE_COMMENT)
  const UPDATE_COMMENT = gql`
mutation  {
  update_comments(where: {name: {_eq: "${name}"}}, _set: {text: "${updateTextComment}"}) {
    affected_rows
  }
}
  `
  const GET_COUNTS_LIKES_COMMENTS = gql`
 query MyQuery {
  likesComments_aggregate(where: {commentId: {_eq: "${name}"}}) {
    aggregate {
      count
    }
  }
}
`

  const ADD_LIKE_COMMENTS =
    gql`
mutation MyMutation {
  insert_likesComments_one(object: {commentId: "${name}",  userIdCommentary: "${userData?.id}"}) {
    commentId
  }
}
  
  `


  const DELETE_LIKE_COMMENTS = gql`
mutation MyMutation2 {
  delete_likesComments_by_pk(commentId: "${name}") {
    userIdCommentary
    commentId
  }
}
  `

  const [addLikesComments] = useMutation(ADD_LIKE_COMMENTS)
  const [deleteLikesComments] = useMutation(DELETE_LIKE_COMMENTS)
 const getCountsLikesComments = useQuery(GET_COUNTS_LIKES_COMMENTS).data

  const [updateComment] = useMutation(UPDATE_COMMENT)

  function handleDeleteComment() {
    const commentsArray = instantComments?.filter(o => o.name !== name)
    setInstantComments(commentsArray)
    deleteComment().catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    setUpdateTextComment(text)
  }, [text])

  function handleUpdateComment() {
    setClickButton(!clickButton)

  }

  function handleSaveUpdateComment() {
    updateComment()
      .then(setClickButton(!clickButton))
      .catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    if (getCountsLikesComments?.likesComments_aggregate?.aggregate?.count !== undefined) {
      setCountLikesComment(getCountsLikesComments?.likesComments_aggregate?.aggregate?.count)
    }

  }, [getCountsLikesComments])




  function handleClickLikeComment(name) {
    console.log(name,'name')
    if (instantLikesComments?.some(t => t.commentId === name)) {

      let tmp = instantLikesComments.filter(o => o.commentId !== name);
     console.log(tmp,'tmp')
      setCountLikesComment(countLikesComment - 1)
      deleteLikesComments().then(
        setInstantLikesComments(tmp)
      ).catch((err) => {
        console.log(err, 'DelErr')
      })
    } else {
      setCountLikesComment(countLikesComment + 1)
      addLikesComments({
        variables: {
          commentId: name,
        }
      }).then(
        setInstantLikesComments(() => [...instantLikesComments, {__typename: 'likes', commentId: name, userIdCommentary: userData.id}]))
        .catch((err) => {
          console.log(err, 'AddErr')
        })
    }

  }
  const formatDate = (date) => {
    const options = {year: "numeric", month: "long", day: "numeric", hour: '2-digit', minute: '2-digit'}
    return new Date(date).toLocaleDateString(undefined, options)
  }
  return (
    <section className={style.comment}>
      {!clickButton === true ? <CommentEdit
        handleUpdateComment={handleUpdateComment}
        date={date}
        text={text}
        updateTextComment={updateTextComment}
        handleSaveUpdateComment={handleSaveUpdateComment}
        setUpdateTextComment={setUpdateTextComment}/> : null}
      <div className={style.comment__cover}>
        <div className={style.comment__boxPhoto}>
          <User className={style.comment__user}/>
        </div>
        <div className={style.comment__box}>
          <h2 className={style.comment__title}>{user?.displayName}</h2>

          <p className={style.comment__time}> {formatDate(date)}</p>
          <p className={style.comment__text}>{clickButton === true && updateTextComment ? updateTextComment : text}</p>
          <div className={style.comment__bottomBox}>
            <p className={style.comment__info}>Пожаловаться</p>
          {instantLikesComments?.some(t => t.commentId === name) ?
              <ButtonLikeFull onClick={() => handleClickLikeComment(name)} countLikes={countLikesComment}/> :
              <ButtonLikeEmpty onClick={() => handleClickLikeComment(name)} countLikes={countLikesComment}/>}
          </div>
          {isAuthenticated ?
            (userId.id === user.id ? <div className={style.comment__cover}>
              {clickButton === true ? <button onClick={handleUpdateComment} className={style.comment__edit}>
               Редактировать
              </button> : <button onClick={handleSaveUpdateComment} className={style.comment__edit}>
                Сохранить
              </button>}
              <button onClick={handleDeleteComment} className={style.comment__edit}>
                <p>Удалить</p>
                <div className={style.comment__delete}></div>
              </button>
            </div> : null) : null}
        </div>

      </div>
    </section>
  )
}

export default Comment
