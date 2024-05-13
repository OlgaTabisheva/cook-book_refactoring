import style from './ProductQuantity.module.scss'
import ButtonPicture from "../../shared/Buttons/ButtonPicture/ButtonPicture.jsx";
import ButtonUnits from "../../shared/Buttons/ButtonUnits/ButtonUnits.jsx";
import PopupUnits from "../Popup/PopupUnits/PopupUnits.jsx";
import {useEffect, useState} from "react";


function ProductQuantity({
                           obj,
                           productQuantityMap,
                           setProductQuantityMap,
  setTextProductForError
                         }) {

  const [isOpen, setIsOpen] = useState(true);
  const [productInfo, setProductInfo] = useState({number: obj?.number, product: obj?.product, count: obj?.count, unit: obj?.unit})

  function handleDeleteProduct(id) {
    const updatedItems = productQuantityMap.filter(i => i.number !== id.number)
    console.log(updatedItems,'updatedItems')
    setProductQuantityMap(updatedItems)
  }

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    const updatedItems = productQuantityMap
    const ind = updatedItems.findIndex(i => i.number === obj.number)
    if (ind === -1)
      updatedItems.push(productInfo)
    else
      updatedItems[ind] = productInfo
    setProductQuantityMap(updatedItems)
    setTextProductForError(productInfo?.product)
  }, [productInfo])


  return (
    <section className={style.productQuantity}   key = {obj.id}>
      <div className={style.productQuantity__deckstop}>
        <h3 className={style.productQuantity__subtitle}>Укажите продукт</h3>
        <input className={style.productQuantity__input} placeholder={'введите продукт'} value={productInfo.product}
               onChange={(e) => setProductInfo({
                 number: obj.number,
                 count: productInfo.count,
                 unit: productInfo.unit,
                 product: e.target.value
               })}/>
      </div>
      <div className={style.productQuantity__box}>
        <div>
        <h3 className={style.productQuantity__subtitle}>Ед. изм.</h3>
        {/*   <button className={style.productQuantity__select} id="fruits" name="fruits">
          <option data-color="black" value="" disabled selected hidden>Please Choose...</option>>
        </button>*/}
        <ButtonUnits text={productInfo.unit} onClick={() => togglePopup()}/>
        </div>
      <div className={style.productQuantity__boxCount}>
        <h3 className={style.productQuantity__subtitle}>Количество</h3>
        <input className={style.productQuantity__inputCount} placeholder={'введите массу'} value={productInfo.count}
               onChange={(e) => setProductInfo({
                 number: obj.number,
                 unit: productInfo.unit,
                 product: productInfo.product,
                 count: e.target.value
               })}/>

      </div>
      </div>
      <div className={style.productQuantity__mobile}>
        <h3 className={style.productQuantity__subtitle}>Укажите продукт</h3>
        <input className={style.productQuantity__input} placeholder={'введите продукт'} value={productInfo.product}
               onChange={(e) => setProductInfo({
                 number: obj.number,
                 count: productInfo.count,
                 unit: productInfo.unit,
                 product: e.target.value
               })}/>
      </div>
      <div className={style.productQuantity__mobileBox}>
      <div className={style.productQuantity__mobileBoxText}>Индигридиент:</div>
      <ButtonPicture value={'close'} size={'big'} onClick={() => handleDeleteProduct(obj)}/>
      </div>
      <div className={style.productQuantity__deckstop}>
        <ButtonPicture value={'close'} size={'big'} onClick={() => handleDeleteProduct(obj)}/>
      </div>
      <PopupUnits setIsOpen={setIsOpen} isOpen={isOpen} productInfo={productInfo} setProductInfo={setProductInfo}
                  numberId={obj.number}/>
    </section>
  )
}

export default ProductQuantity