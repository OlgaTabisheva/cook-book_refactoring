import style from './Comment.module.scss'
import {ReactComponent as User} from '../../assets/user.svg';
import ButtonLikeFull from "../../shared/Buttons/ButtonLike/ButtonLikeFull.jsx";
import {useEffect, useState} from "react";
import {gql, useMutation} from "@apollo/client";
import CommentEdit from "../CommentEdit/CommentEdit.jsx";


function Comment({
                   name,
                   text,
                   user,
                   date,
                   instantComments,
                   setInstantComments,
                   isAuthenticated,
                   userId
                 }) {
  const [updateTextComment, setUpdateTextComment] = useState()
  const [clickButton, setClickButton] = useState(true)
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
    updateComment().then(setClickButton(!clickButton)).catch((err) => {
      console.log(err)
    })
  }

  const formatDate = (date) => {
    const options = {year: "numeric", month: "long", day: "numeric", hour: '2-digit', minute: '2-digit'}
    return new Date(date).toLocaleDateString(undefined, options)
  }
  return (
    <section className={style.comment}>
      {!clickButton === true ? <CommentEdit/> : null}
      <div className={style.comment__cover}>
        <div className={style.comment__boxPhoto}>
          <User className={style.comment__user}/>
        </div>
        <div className={style.comment__box}>
          <h2 className={style.comment__title}>{user?.displayName}</h2>

          <p className={style.comment__time}> {formatDate(date)}</p>
          <p className={style.comment__text}>{text}</p>
          <div className={style.comment__bottomBox}>
            <p className={style.comment__info}>Пожаловаться</p>
            <ButtonLikeFull countLikes={5}/>

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
