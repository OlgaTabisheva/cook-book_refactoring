import style from './DefaultUserPhoto.module.scss'
import {useUserData} from "@nhost/react";
import photo from './../../assets/userYelow.svg'
import 'react-image-crop/src/ReactCrop.scss'
import {useEffect, useState} from "react";
import PopupDownloadImage from "../../widgets/Popup/PopupDownloadImage/PopupDownloadImage.jsx";
//import ReactCrop, { type Crop } from 'react-image-crop'
//import {useState} from "react";

/*function CropDemo({ src }) {
  const [crop, setCrop] = useState<Crop>()
  return (
    <ReactCrop crop={crop} onChange={c => setCrop(c)}>
      <img src={src} />
    </ReactCrop>
  )
}*/

function DefaultUserPhoto({formData}) {

  const [openDownloadPopup, setOpenDownloadPopup]= useState(false)

console.log(openDownloadPopup,'openDownloadPopup')
  const user = useUserData()
  const defaultAvatar= 'https://s.gravatar.com/avatar/'
  return (
    <>
    <button className={style.defaultUserPhoto} onClick={()=>setOpenDownloadPopup(!openDownloadPopup)}>
      <div className={style.defaultUserPhoto__imgBox}>
        <img className={style.defaultUserPhoto__img} src={ user?.avatarUrl.includes(defaultAvatar)  ? photo : user.avatarUrl} alt={'user photo'}/>

      </div>
    </button>
      {openDownloadPopup && <PopupDownloadImage/>}
    </>
  )
}

export default DefaultUserPhoto