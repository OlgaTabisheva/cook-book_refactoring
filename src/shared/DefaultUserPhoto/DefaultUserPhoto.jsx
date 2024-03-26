import style from './DefaultUserPhoto.module.scss'
import {useUserData} from "@nhost/react";
import photo from './../../assets/userYelow.svg'


function DefaultUserPhoto() {

  const user = useUserData()
  const defaultAvatar= 'https://s.gravatar.com/avatar/451339c818f3b4fa99947f6a4c2f8027?r=g&default=blank'
  return (
    <section className={style.defaultUserPhoto}>
      <div className={style.defaultUserPhoto__img}>
        <img src={ user?.avatarUrl === defaultAvatar ? photo : user.avatarUrl} alt={'user photo'}/>
      </div>
    </section>
  )
}

export default DefaultUserPhoto