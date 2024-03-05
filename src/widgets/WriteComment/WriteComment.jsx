import style from './WriteComment.module.scss'
import img from './../../assets/test.jpg'
import ButtonBasic from "../../shared/Buttons/ButtonBasic/ButtonBasic.jsx";
import {ReactComponent as User} from '../../assets/user.svg';

function WriteComment() {
  return (
    <div className={style.writeComment}>
      <div className={style.writeComment__boxPhoto}>
        <User className={style.writeComment__user}/>
      </div>
      <div className={style.writeComment__box}>
<textarea className={style.writeComment__area} placeholder={'Написать комментарий...'}>

</textarea>
      <ButtonBasic color={'primaryGreen'} text={'Отправить'}> </ButtonBasic>
      </div>
    </div>
  )
}

export default WriteComment
