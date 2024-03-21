import style from './ProductQuantity.module.scss'
import ButtonPicture from "../../shared/Buttons/ButtonPicture/ButtonPicture.jsx";
import ButtonUnits from "../../shared/Buttons/ButtonUnits/ButtonUnits.jsx";
import PopupUnits from "../Popup/PopupUnits/PopupUnits.jsx";
import {useEffect, useState} from "react";


function ProductQuantity({
                           obj,
                           productQuantityMap,
                           setProductQuantityMap,
                           productUnitQuantity,
                           setProductUnitQuantity
                         }) {

  const [isOpen, setIsOpen] = useState(true);

  const [productName, setProductName] = useState()
  const [productCount, setProductCount] = useState()
  const [productUnit, setProductUnit] = useState()

  function handleDeleteProduct(id) {
    const updatedItems = productQuantityMap.filter((item) => item.lineNumber !== id)
    setProductQuantityMap(updatedItems)


  }

  useEffect(() => {
    //setProductUnitQuantity(...productQuantityMap, [{product: productName, unit: productUnit, quantity: productCount}])
  }, [productName, productUnit, productCount])

  /*  arr.splice(start[, deleteCount, elem1, ..., elemN])
    Он изменяет arr начиная с индекса start:
      удаляет deleteCount элементов и
    затем вставляет elem1, ..., elemN на их место.
      Возвращает массив из удалённых элементов.*/


  const togglePopup = () => {
    setIsOpen(!isOpen);
  }


  /*  useEffect(()=>{
      setProductQuantityMap([{product:productName},{unit:productUnit},  {count:productCount}])
    },[productName,productCount,productUnit])*/
  return (
    <section className={style.productQuantity}>
      <div>
        <h3 className={style.productQuantity__subtitle}>Укажите продукт</h3>
        <input className={style.productQuantity__input} placeholder={'введите продукт'} value={productName}
               onChange={(e) => setProductName(e.target.value)}/>
      </div>
      <div>
        <h3 className={style.productQuantity__subtitle}>Ед. изм.</h3>
        {/*   <button className={style.productQuantity__select} id="fruits" name="fruits">
          <option data-color="black" value="" disabled selected hidden>Please Choose...</option>>
        </button>*/}
        <ButtonUnits text={productUnit} onClick={() => togglePopup()}/>
      </div>
      <div className={style.productQuantity__boxCount}>
        <h3 className={style.productQuantity__subtitle}>Количество</h3>
        <input className={style.productQuantity__inputCount} placeholder={'введите массу'} value={productCount}
               onChange={(e) => setProductCount(e.target.value)}/>

      </div>
      <ButtonPicture value={'close'} size={'big'} onClick={() => handleDeleteProduct(obj.lineNumber)}/>
      <PopupUnits setIsOpen={setIsOpen} isOpen={isOpen} productUnit={productUnit} setProductUnit={setProductUnit}/>
    </section>
  )
}

export default ProductQuantity