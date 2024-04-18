import style from "./PopupCropImage.module.scss";
import ButtonPicture from "../../../shared/Buttons/ButtonPicture/ButtonPicture.jsx";
import ButtonBasic from "../../../shared/Buttons/ButtonBasic/ButtonBasic.jsx";
import React, {useState, useEffect} from "react";
import Cropper from 'react-easy-crop'
import {getOrientation} from 'get-orientation/browser'
import {getCroppedImg, getRotatedImage} from './../../../utils/canvasUtils'
import {nhost} from "../../../main.jsx";
import {dataURLtoFile} from "../../../utils/Utils.js";

const ORIENTATION_TO_ANGLE = {
  '3': 180,
  '6': 90,
  '8': -90,
}


function PopupCropImage({
                          popupCropImage,
                          setPopupCropImage,
                          fileUpload,
                          setStepRecipeInfoMain,
                          stepRecipeInfoMain,
                          setMainRecipeImage,
  stepRecipeInfo, setStepRecipeInfo,
                          obj,
                        }) {
  const [imageSrc, setImageSrc] = React.useState(null)
  const [crop, setCrop] = useState({x: 0, y: 0})
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [croppedImage, setCroppedImage] = useState(null)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  const showCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation
      )

      let blob = await fetch(croppedImage).then((r) => r.blob());
      let reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = function () {
        let base64data = reader.result;
        setCroppedImage(base64data)
      };




    } catch (e) {
      console.error(e)
    }
  }
  const uploadCroppedImage = async (croppedImage) => {


    const UrlToFile = dataURLtoFile(croppedImage, 'image.jpg', "image/jpeg")
    console.log(croppedImage, 'croppedImage')
   await nhost.storage.upload({file: UrlToFile})
      .then((res) => {
        const publicUrl = nhost.storage.getPublicUrl({fileId: `${res.fileMetadata.id}`})
        if (stepRecipeInfo?.id > 0) {
          setStepRecipeInfo({
            id: obj?.id,
            step: stepRecipeInfo?.step,
            url: publicUrl,
            text: stepRecipeInfo?.text
          })
        } else setMainRecipeImage(publicUrl)

      }).then(
        setPopupCropImage(!popupCropImage)
      )
  }
  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  const onClose = () => {
    setCroppedImage(null)
  }
  const onFileChange = async () => {

    let imageDataUrl = await readFile(fileUpload)
    try {
      // apply rotation if needed
      const orientation = await getOrientation(fileUpload)

      let imageCrop = await getRotatedImage(imageDataUrl, orientation)

    } catch (e) {
      console.warn('failed to detect the orientation')
    }
    setImageSrc(imageDataUrl)
   // setImageSrc(imageCrop)
  //  console.log(imageDataUrl, 'imageDataUrl')

  }


  useEffect(() => {
    if (fileUpload) {
      onFileChange();
    }
  }, [fileUpload])

  return (
    <div className={style.popupCropImage}>
      <div className={style.popupCropImage__box}>
        <p className={style.popupCropImage__text}>Кадрирование фото</p>
        <ButtonPicture value={'brownClose'} size={'smallInherit'} onClick={() => setPopupCropImage(!popupCropImage)}/>
      </div>
      <div className={style.popupCropImage__cropper}>
        {imageSrc && <Cropper
          //  cropSize={{width: 30, height: 120}}
          image={croppedImage ? croppedImage : imageSrc}
          crop={crop}
          rotation={rotation}
          zoom={zoom}
          aspect={4 / 2.5}
          style={{
            containerStyle: {
              width: 504,
              height: 288,
              position: "relative",
              borderRadius: "12px",
              display: "flex"
            }, cropAreaStyle: {width: 240, height: 137}
          }}
          onCropChange={setCrop}
          onRotationChange={setRotation}
          onZoomChange={setZoom}
          minZoom={0}
          objectFit={'contain'}
          maxZoom={3}
          onCropComplete={onCropComplete}
          //    objectFit={'cover'}
        />}
      </div>
      <div className={style.popupCropImage__buttons}>
        <ButtonBasic color={'secondaryGreen'} text={'Отменить'} type={'button'}
                     onClick={() => setPopupCropImage(!popupCropImage)}/>
        {!croppedImage &&   <ButtonBasic color={'primaryGreen'} text={'Показать обрезаную картинку'} type={'button'}
                     onClick={() => showCroppedImage(imageSrc)}/>}
        {croppedImage &&   <ButtonBasic color={'primaryGreen'} text={'Установить'} type={'button'}
                                         onClick={() => uploadCroppedImage(croppedImage)}/>}
      </div>
    </div>
  )
}

export default PopupCropImage


function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => resolve(reader.result), false)
    reader.readAsDataURL(file)
  })
}




