import style from './UserProfile.module.scss'
import DefaultUserPhoto from "../../shared/DefaultUserPhoto/DefaultUserPhoto.jsx";
import InputAuth from "../../shared/InputAuth/InputAuth.jsx";
import ButtonBasic from "../../shared/Buttons/ButtonBasic/ButtonBasic.jsx";
import {useSignOut, useUserData} from "@nhost/react";
import {gql, useMutation} from "@apollo/client";
import {toast} from "react-hot-toast";
import {useCallback, useEffect, useState} from "react";
import PopupDownloadImage from "../Popup/PopupDownloadImage/PopupDownloadImage.jsx";
import {FileUploader} from "react-drag-drop-files";
import PopupCropImage from "../Popup/PopupCropImage/PopupCropImage.jsx";

const fileTypes = ["JPG", "PNG", "GIF"];

function UserProfile({formData, setFormData, setOpenDownloadPopup, openDownloadPopup, setUserUploadFile, userUploadFile}) {

  const {signOut} = useSignOut()
  const user = useUserData()
  const UPDATE_USER_MUTATION = gql`
  mutation ($id: uuid!, $displayName: String!, $email: citext, $avatarUrl: String! ) {
    updateUser(pk_columns: { id: $id }, _set: { displayName: $displayName , email :$email, avatarUrl : $avatarUrl }) {
      id
      displayName
      email
      avatarUrl
    }
  }
`
  const [mutateUser, {loading: updatingProfile}] = useMutation(UPDATE_USER_MUTATION)

  useEffect(() => {
    setFormData(user)
  }, [user])
  const handleInputChange = useCallback((e) => {
    const {id, value} = e.target;
    setFormData(prevState => ({...prevState, [id]: value}));
  }, [setFormData])


  const updateUserProfile = async (e) => {
    e.preventDefault()
    try {
      await mutateUser({
        variables: {
          id: user.id,
          displayName: formData.displayName,
          avatarUrl: formData.avatarUrl,
          email: formData.email
        }
      })
      toast.success('Обновленно успешно!')
    } catch (error) {
      toast.error('Не обновлено!Что-то пошло не так!')
    }
  }
  useEffect(() => {
    setFormData(user)
  }, [user])

  const handleChange = async (file)=> {
console.log(file,'file')
    setUserUploadFile(file)


  }
  return (
    <section className={style.userProfile}>
      <FileUploader maxSize={5} name="file" types={fileTypes} handleChange={handleChange}>
        <input type="file"/>

        <DefaultUserPhoto formData={formData} setOpenDownloadPopup={setOpenDownloadPopup}
                          openDownloadPopup={openDownloadPopup}/>
      </FileUploader>
      <form className={style.userProfile__box}>
        <InputAuth title={'Имя'} text={'Тут будет имя'} value={
          formData?.displayName} onChange={handleInputChange} placeholder={user.displayName}  id="displayName"/>
        <InputAuth title={'Почта'} text={'pochtapochta@gmail.com'} placeholder={user.email}  value={
          formData?.email} onChange={handleInputChange} id="email"/>
      </form>
      <form className={style.userProfile__form}>
        <h3 className={style.userProfile__title}>Смена пароля </h3>
        <InputAuth title={'Введите новый пароль'} text={'Введите пароль'} placeholder={'смена пароля не доступна'}
                   disabled={true}/>
        <InputAuth title={'Подтвердите пароль'} text={'Пароль ещё раз'} placeholder={'смена пароля не доступна'}
                   disabled={true}/>
        <div className={style.userProfile__buttons}>
          <ButtonBasic onClick={updateUserProfile} text={'Сохранить изменения'} color={'primaryGreen'} type={'submit'}/>
          <ButtonBasic text={'Выйти'} color={'secondaryRed'} onClick={signOut} type={'button'}/>
        </div>
      </form>



    </section>
  )
}

export default UserProfile