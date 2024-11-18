import styles from "./PersonalPage.module.scss";
import {useAuthenticated, useSignOut, useUserData} from "@nhost/react";
import React, {useCallback, useEffect, useState,} from "react";
import ButtonChips from "../../shared/Buttons/ButtonChips/ButtonChips.jsx";
import UserProfile from "../../widgets/UserProfile/UserProfile.jsx";
import FavoritesRecipes from "../../widgets/FavoritesRecipes/FavoritesRecipes.jsx";
import UserRecipes from "../../widgets/UserRecipes/UserRecipes.jsx";
import style from './../../pages/AddRecipe/AddRecipe.module.scss'
import AdminRights from "../../widgets/AdminRights/AdminRights.jsx";
import PopupCropImage from "../../widgets/Popup/PopupCropImage/PopupCropImage.jsx";
import PopupSizePicture from "../../widgets/Popup/PopupSizePicture/PopupSizePicture.jsx";


export const PersonalPage = ({formData, setFormData, instantLikes, setInstantLikes, likesFromServer}) => {
  const [openDownloadPopup, setOpenDownloadPopup] = useState(false)
  const [userUploadFile, setUserUploadFile] = useState()
  const [changeButton, setChangeButton] = useState('Профиль')
  const [userCropUrl, setUserCropUrl] = useState()
  const user = useUserData()
  const defaultRole = user?.defaultRole?.includes('AdminRecipes')
  const [openSizeImagePopup, setOpenSizeImagePopup] = useState(false)


  useEffect(()=>{
    console.log(userUploadFile?.size, '88')
if( userUploadFile?.size > 5242880){
  setOpenSizeImagePopup(!openSizeImagePopup)
}
  },[userUploadFile])
  return (
    <section className={styles.personalPage}>
      <div className={styles.personalPage__chips}>
        <ButtonChips text={'Избранное'} onClick={() => setChangeButton('Избранное')}
                     active={changeButton === 'Избранное' ? 'active' : ''}/>
        <ButtonChips text={'Мои Рецепты'} onClick={() => setChangeButton('Мои Рецепты')}
                     active={changeButton === 'Мои Рецепты' ? 'active' : ''}/>
        <ButtonChips text={'Профиль'} onClick={() => setChangeButton('Профиль')}
                     active={changeButton === 'Профиль' ? 'active' : ''}/>
        {defaultRole &&
          <ButtonChips text={'Дополнительные права'} onClick={() => setChangeButton('Дополнительные права')}
                       active={changeButton === 'Дополнительные права' ? 'active' : ''}/>}
      </div>
      <div className={styles.personalPage__box}>
        {changeButton === 'Избранное' ? <FavoritesRecipes instantLikes={instantLikes}
                                                          setInstantLikes={setInstantLikes}
                                                          likesFromServer={likesFromServer}/> : null}
        {changeButton === 'Мои Рецепты' ? <UserRecipes/> : null}
        {changeButton === 'Профиль' ?
          <UserProfile userCropUrl={userCropUrl} userUploadFile={userUploadFile} setUserUploadFile={setUserUploadFile}
                       setOpenDownloadPopup={setOpenDownloadPopup} openDownloadPopup={openDownloadPopup}
                       formData={formData} setFormData={setFormData}/> : null}
        {changeButton === 'Дополнительные права' ? <AdminRights formData={formData} setFormData={setFormData}/> : null}
      </div>

      {openDownloadPopup === true && <div className={style.addRecipe__popup}>
        <PopupCropImage setPopupCropImage={setOpenDownloadPopup} setUserCropUrl={setUserCropUrl}
                        fileUpload={userUploadFile} popupCropImage={openDownloadPopup} userUploadFile={userUploadFile}/>
        <div className={style.addRecipe__overlay}></div>
      </div>}
      {openSizeImagePopup &&
        <PopupSizePicture openSizeImagePopup={openSizeImagePopup} setOpenSizeImagePopup={setOpenSizeImagePopup}/>

   }
    </section>
  );
}