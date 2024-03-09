import style from './ButtonPicture.module.scss'
import {ReactComponent as Minus} from '../../../assets/minus.svg';
import {ReactComponent as Plus} from '../../../assets/plus.svg';
import {ReactComponent as Close} from '../../../assets/close.svg';
import {ReactComponent as Image} from '../../../assets/image.svg';
function ButtonPicture({value, onClick, disabled, size}) {
  return (
    <button
      className={size === 'normal' && style.buttonPicture ||
      size === 'big' && style.buttonPicture__big ||
      size === 'circle' && style.buttonPicture__circle ||
        size === 'normalWhite' && style.buttonPicture__white}
      onClick={onClick ? onClick : null} disabled={disabled}>
      {value === 'plus' && <Plus className={style.buttonPicture__plus}/>}
      {value === 'minus' && <Minus className={style.buttonPicture__minus}/>}
      {value === 'close' && <Close className={style.buttonPicture__close}/>}
      {value === 'image' && <Image className={style.buttonPicture__image}/>}
    </button>
  )
}

export default ButtonPicture
