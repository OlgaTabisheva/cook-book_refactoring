import style from './DefaultUserPhoto.module.scss'
import {useUserData} from "@nhost/react";
import photo from './../../assets/userYelow.svg'
import 'react-image-crop/src/ReactCrop.scss'

function DefaultUserPhoto({setOpenDownloadPopup, openDownloadPopup, userUploadFile, userCropUrl, formData}) {


  const user = useUserData()
  const defaultAvatar = 'https://s.gravatar.com/avatar/'

  return (
    <>
      {user?.avatarUrl?.includes(defaultAvatar) ? (
          <button className={style.defaultUserPhoto} onClick={() => setOpenDownloadPopup(!openDownloadPopup)}>
            <div className={style.defaultUserPhoto__imgBox}>
              <img className={style.defaultUserPhoto__img} src={photo} alt={'user photo'}/>
            </div>
          </button>)
        :
        (<button className={style.userPhoto} onClick={() => setOpenDownloadPopup(!openDownloadPopup)}>
          <div className={style.userPhoto__imgBox}>
            <img className={style.userPhoto__img}
                 src={(userCropUrl === undefined) ? (formData?.avatarUrl ? formData?.avatarUrl : userCropUrl) : userCropUrl}
                 alt={'user photo'}/>
          </div>
        </button>)}
    </>
  )
}

export default DefaultUserPhoto