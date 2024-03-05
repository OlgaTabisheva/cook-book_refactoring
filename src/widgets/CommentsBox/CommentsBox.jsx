import style from './CommentsBox.module.scss'
import Comments from "../Comment/Comment.jsx";
import WriteComment from "../WriteComment/WriteComment.jsx";


function CommentsBox() {
  return (
    <section className={style.commentsBox}>
<h2 className={style.commentsBox__title}>Комментарии </h2>
<Comments/>
      <Comments/>
      <Comments/>
      <WriteComment/>
    </section>
  )
}

export default CommentsBox
