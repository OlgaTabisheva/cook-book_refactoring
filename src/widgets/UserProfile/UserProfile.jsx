import style from './UserProfile.module.scss'
import DefaultUserPhoto from "../../shared/DefaultUserPhoto/DefaultUserPhoto.jsx";
import InputAuth from "../../shared/InputAuth/InputAuth.jsx";
import ButtonBasic from "../../shared/Buttons/ButtonBasic/ButtonBasic.jsx";
import {useSignOut, useUserData} from "@nhost/react";
import {gql, useMutation} from "@apollo/client";
import {toast} from "react-hot-toast";
import {useEffect, useState} from "react";
import PopupDownloadImage from "../Popup/PopupDownloadImage/PopupDownloadImage.jsx";
import {FileUploader} from "react-drag-drop-files";
import ImageBlobReduce from "image-blob-reduce";

const fileTypes = ["JPG", "PNG", "GIF"];
function UserProfile({formData, setFormData}) {
  const {signOut} = useSignOut()
  const user = useUserData()

  const [openDownloadPopup, setOpenDownloadPopup]= useState(false)
const [boxFileUploader, setBoxFileUploader] = useState()
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







  return (
    <section className={style.userProfile}>
      <FileUploader maxSize={5}  name="file" types={fileTypes} handleChange={(file)=>onDrop(file)}>
        <input type="file"  />

      <DefaultUserPhoto formData={formData} setOpenDownloadPopup={setOpenDownloadPopup} openDownloadPopup={openDownloadPopup} />
      </FileUploader>
      <form className={style.userProfile__box}>
        <InputAuth title={'Имя'} text={'Тут будет имя'} value={
          user?.displayName}/>
        <InputAuth title={'Почта'} text={'pochtapochta@gmail.com'} value={
          user?.email}/>
      </form>
      <form className={style.userProfile__form}>
        <h3 className={style.userProfile__title}>Смена пароля </h3>
        <InputAuth title={'Введите новый пароль'} text={'Введите пароль'}/>
        <InputAuth title={'Подтвердите пароль'} text={'Пароль ещё раз'}/>
        <div className={style.userProfile__buttons}>
          <ButtonBasic text={'Сохранить изменения'} disabled color={'primaryGreen'}/>
          <ButtonBasic text={'Выйти'} color={'secondaryRed'} onClick={signOut}/>
        </div>
      </form>



      { openDownloadPopup && <PopupDownloadImage setOpenDownloadPopup={setOpenDownloadPopup} openDownloadPopup={openDownloadPopup} boxFileUploader={boxFileUploader}/>}


    </section>
  )
}

export default UserProfile