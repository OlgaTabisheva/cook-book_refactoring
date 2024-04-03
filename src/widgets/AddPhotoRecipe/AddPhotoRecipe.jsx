import style from './AddPhotoRecipe.module.scss'
import {ReactComponent as ImagePicture} from '../../assets/image 60.svg';
import {FileUploader} from "react-drag-drop-files";
import {nhost} from "../../main.jsx";

import 'react-image-crop/src/ReactCrop.scss'

const fileTypes = ["JPG", "PNG", "GIF"];



function AddPhotoRecipe({ setStepRecipeInfo, stepRecipeInfo, obj, setMainRecipeImage}) {


  const handleChange = async (file)=> {
      await nhost.storage.upload({file: file})
      .then((res) => {
        const publicUrl = nhost.storage.getPublicUrl({fileId: `${res.fileMetadata.id}`})
        console.log(publicUrl,'publicUrl')
        console.log(stepRecipeInfo?.id, 'stepRecipeInfo.id)')
        if (stepRecipeInfo?.id>0) {
          setStepRecipeInfo({
            id: obj.id,
            step: stepRecipeInfo?.step,
            url: publicUrl,
            text: stepRecipeInfo?.text
          })
        }else  setMainRecipeImage(publicUrl)
    })
  };

  return (


    <FileUploader maxSize={5}  name="file" types={fileTypes} handleChange={handleChange}>
      <section className={style.addPhotoRecipe}>
        <ImagePicture className={style.addPhotoRecipe__image}/>
        <p className={style.addPhotoRecipe__text}>Перетащите фотографию сюда или нажмите на иконку</p>
      </section>
    </FileUploader>

  )
}

export default AddPhotoRecipe