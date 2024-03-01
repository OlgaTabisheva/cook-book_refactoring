import style from './UserProfile.module.scss'
import DefaultUserPhoto from "../../shared/DefaultUserPhoto/DefaultUserPhoto.jsx";
import InputAuth from "../../shared/InputAuth/InputAuth.jsx";
import ButtonBasic from "../../shared/Buttons/ButtonBasic/ButtonBasic.jsx";


function UserProfile() {

  return (
    <section className={style.userProfile}>

      <DefaultUserPhoto/>
      <InputAuth title={'Имя'} text={'Тут будет имя'}/>
      <InputAuth title={'Почта'} text={'pochtapochta@gmail.com'}/>
      <form >
      <h3>Смена пароля </h3>
      <InputAuth title={'Введите новый пароль'} text={'Введите пароль'}/>
      <InputAuth title={'Подтвердите пароль'} text={'Пароль ещё раз'}/>
        <ButtonBasic text={'Сохранить изменения'} disabled color={'primaryGreen'}/>
      </form>
    </section>
  )
}

export default UserProfile