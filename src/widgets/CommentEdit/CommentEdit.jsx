import style from "./CommentEdit.module.scss";
import {ReactComponent as User} from '../../assets/user.svg';
import TextareaAutosize from "react-textarea-autosize";

function CommentEdit() {

  const formatDate = (date) => {
    const options = {year: "numeric", month: "long", day: "numeric", hour: '2-digit', minute: '2-digit'}
    return new Date(date).toLocaleDateString(undefined, options)
  }
  return (
    <section className={style.commentEdit}>
      <div className={style.commentEdit__boxPhoto}>
        <User className={style.commentEdit__user}/>
      </div>
      <div className={style.commentEdit__box}>
        <h2 className={style.commentEdit__title}>Мой комментарий</h2>
        <h3 className={style.commentEdit__date}>formatDate(date)</h3>
        <TextareaAutosize className={style.commentEdit__textArea}>ext</TextareaAutosize>
        <div className={style.comment__bottomBox}>
          <button className={style.commentEdit__info}>Сохранить</button>
          <button className={style.commentEdit__info}>Отменить</button>
        </div>
      </div>
    </section>
  )
}

export default CommentEdit