import style from './ProductQuantity.module.scss'
import InputAuth from "../../shared/InputAuth/InputAuth.jsx";
import ButtonBasic from "../../shared/Buttons/ButtonBasic/ButtonBasic.jsx";


function ProductQuantity() {
  return (
    <section className={style.productQuantity}>
      <div >
      <h3 className={style.productQuantity__subtitle}>Укажите продукт</h3>
      <input className={style.productQuantity__input} placeholder={'Пшеничная мука'}/>
      </div>
      <div>
        <h3 className={style.productQuantity__subtitle}>Ед. изм.</h3>
      <select className={style.productQuantity__select} id="fruits" name="fruits">
        <option value="" disabled selected hidden>Please Choose...</option>
      <option value="apple">Яблоко</option>
      <option value="banana">Банан</option>
      <option value="orange">Апельсин</option>
    </select>
    </div>
      <div>
        <h3 className={style.productQuantity__subtitle}>Количество</h3>
      <input placeholder={'100'}/>

</div>
    </section>
  )
}

export default ProductQuantity