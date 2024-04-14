import style from './PopupDownloadImage.module.scss'
import React, { useState, createRef } from "react";
import uret from './../../../assets/test.jpg'
import 'react-image-crop/dist/ReactCrop.css'
import ButtonBasic from "../../../shared/Buttons/ButtonBasic/ButtonBasic.jsx";
import ButtonPicture from "../../../shared/Buttons/ButtonPicture/ButtonPicture.jsx";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

function PopupDownloadImage({setOpenDownloadPopup, openDownloadPopup, boxFileUploader, onClick}) {


  const [cropData, setCropData] = useState("#");
  const cropperRef = createRef();


  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
    }
  };

return (
  <div className={style.wrapper}>
    <div className={style.popupDownloadImage}>
      <div className={style.popupDownloadImage__box}>
        <div className={style.popupDownloadImage__boxPopup}>
        <h3>Кадрирование фото </h3><ButtonPicture size={'smallInherit'} value={'brownClose'} onClick={()=>setOpenDownloadPopup(!openDownloadPopup)}/>
        </div>
{/*
     <img alt={'photo'} src={uret} width={'500px'} height={'600px'}/>
*/}
        <Cropper
          ref={cropperRef}
          style={{ height: 400, width: "100%" }}
          zoomTo={0.5}
          initialAspectRatio={1}
          preview=".img-preview"
          src={boxFileUploader}
          viewMode={1}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
          guides={true}
        />
        <img style={{ width: "100%" }} src={cropData} alt="cropped" />
        <div>
          <ButtonBasic color={'secondaryGreen'} text={'Отменить'}/>
          <ButtonBasic color={'primaryGreen'} text={'Установить'} onClick={onClick}/>
        </div>

    </div>
    </div>
  </div>
  )
}

export default PopupDownloadImage