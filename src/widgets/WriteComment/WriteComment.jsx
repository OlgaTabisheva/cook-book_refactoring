import style from './WriteComment.module.scss'
import img from './../../assets/test.jpg'
import ButtonBasic from "../../shared/Buttons/ButtonBasic/ButtonBasic.jsx";
import {ReactComponent as User} from '../../assets/user.svg';
import TextareaAutosize from "react-textarea-autosize";
import {useUserDisplayName} from "@nhost/react";

function WriteComment({handleAddComments, textComment, commentEditText, setTextComment}) {


  const userDisplayName = useUserDisplayName()
  return (
    <div className={style.writeComment}>
      <div className={style.writeComment__boxPhoto}>
        <User className={style.writeComment__user}/>
      </div>
      <div className={style.writeComment__box}>
        <TextareaAutosize defaultValue={textComment} className={style.writeComment__area}
                          onChange={(e) => setTextComment(e.target.value)} placeholder={'Написать комментарий...'}>

        </TextareaAutosize>
        <ButtonBasic color={'primaryGreen'} text={'Отправить'} onClick={handleAddComments}> </ButtonBasic>

      </div>
    </div>
  )
}

export default WriteComment
