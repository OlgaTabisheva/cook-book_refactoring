import style from './UserProfile.module.scss'
import DefaultUserPhoto from "../../shared/DefaultUserPhoto/DefaultUserPhoto.jsx";
import InputAuth from "../../shared/InputAuth/InputAuth.jsx";
import ButtonBasic from "../../shared/Buttons/ButtonBasic/ButtonBasic.jsx";


function UserProfile() {

  return (
    <section className={style.userProfile}>

      <DefaultUserPhoto/>
      <form className={style.userProfile__box}>
        <InputAuth title={'Имя'} text={'Тут будет имя'}/>
        <InputAuth title={'Почта'} text={'pochtapochta@gmail.com'}/>
      </form>
      <form className={style.userProfile__form}>
        <h3 className={style.userProfile__title}>Смена пароля </h3>
        <InputAuth title={'Введите новый пароль'} text={'Введите пароль'}/>
        <InputAuth title={'Подтвердите пароль'} text={'Пароль ещё раз'}/>
        <div className={style.userProfile__buttons}>
          <ButtonBasic text={'Сохранить изменения'} disabled color={'primaryGreen'}/>
          <ButtonBasic text={'Выйти'} color={'secondaryRed'}/>
        </div>
      </form>
    </section>
  )
}

export default UserProfile