import style from './NoticeProfile.module.scss'
import ButtonBasic from "../../shared/Buttons/ButtonBasic/ButtonBasic.jsx";


function NoticeProfile({src, title, text, textButton, colorButton}) {
  return (
    <section
      className={style.noticeProfile}>
      <img className={style.noticeProfile__img} src={src} alt={'photo'}/>
      <h2 className={style.noticeProfile__title}>{title}</h2>
      <p className={style.noticeProfile__text}>{text}</p>
      <ButtonBasic text={textButton} color={colorButton}/>
    </section>
  )
}

export default NoticeProfile
