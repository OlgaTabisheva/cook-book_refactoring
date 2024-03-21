import style from './AddPhotoRecipe.module.scss'
import {ReactComponent as ImagePicture} from '../../assets/image 60.svg';
import {FileUploader} from "react-drag-drop-files";
import {useState} from "react";

const fileTypes = ["JPG", "PNG", "GIF"];
function AddPhotoRecipe({ setStepPhotoFile}) {

  const handleChange = (file) => {

    setStepPhotoFile(file)
  };

  return (
    <FileUploader maxSize={5} handleChange={handleChange} name="file" types={fileTypes}>
    <section className={style.addPhotoRecipe}>
      <ImagePicture className={style.addPhotoRecipe__image}/>
      <p className={style.addPhotoRecipe__text}>Перетащите фотографию сюда или нажмите на иконку</p>
    </section>
    </FileUploader>
  )
}

export default AddPhotoRecipe