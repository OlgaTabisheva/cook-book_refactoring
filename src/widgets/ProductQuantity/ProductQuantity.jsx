import style from './ProductQuantity.module.scss'
import ButtonPicture from "../../shared/Buttons/ButtonPicture/ButtonPicture.jsx";
import ButtonUnits from "../../shared/Buttons/ButtonUnits/ButtonUnits.jsx";
import PopupUnits from "../Popup/PopupUnits/PopupUnits.jsx";
import {useState} from "react";


function ProductQuantity() {

  const [isOpen, setIsOpen] = useState(true);


  const togglePopup = () => {

    setIsOpen(!isOpen);

  }

  return (
    <section className={style.productQuantity}>
      <div>
        <h3 className={style.productQuantity__subtitle}>Укажите продукт</h3>
        <input className={style.productQuantity__input} placeholder={'Пшеничная мука'}/>
      </div>
      <div>
        <h3 className={style.productQuantity__subtitle}>Ед. изм.</h3>
     {/*   <button className={style.productQuantity__select} id="fruits" name="fruits">
          <option data-color="black" value="" disabled selected hidden>Please Choose...</option>>
        </button>*/}
        <ButtonUnits text={'Шт.'} onClick={()=>togglePopup()} />
      </div>
      <div className={style.productQuantity__boxCount}>
        <h3 className={style.productQuantity__subtitle}>Количество</h3>
        <input className={style.productQuantity__inputCount} placeholder={'100'}/>

      </div>
      <ButtonPicture value={'close'} size={'big'}/>
      <PopupUnits isOpen={isOpen}/>
    </section>
  )
}

export default ProductQuantity