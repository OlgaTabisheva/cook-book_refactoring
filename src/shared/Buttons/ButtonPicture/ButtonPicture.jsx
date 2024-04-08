import style from './ButtonPicture.module.scss'
import {ReactComponent as Minus} from '../../../assets/minus.svg';
import {ReactComponent as Plus} from '../../../assets/plus.svg';
import {ReactComponent as Close} from '../../../assets/close.svg';
import {ReactComponent as Image} from '../../../assets/image.svg';
import {ReactComponent as ArrowSmallLeft} from '../../../assets/arrowSmallLeft.svg';
import {ReactComponent as ArrowSmallRight} from '../../../assets/arrowSmallRight.svg';
import {ReactComponent as SmallClose} from '../../../assets/x.svg';
function ButtonPicture({value, onClick, disabled, size}) {
  return (
    <button
      className={size === 'normal' && style.buttonPicture ||
      size === 'big' && style.buttonPicture__big ||
      size === 'circle' && style.buttonPicture__circle ||
        size === 'normalWhite' && style.buttonPicture__white ||
        size === 'smallInherit' && style.buttonPicture__small ||
        size === 'smallBlack' && style.buttonPicture__smallBlack ||

        size === 'smallRose' && style.buttonPicture__smallRose ||
        size === 'smallBlackSquare' && style.buttonPicture__smallBlackSquare ||
        size === 'prev' && style.prev ||
        size === 'next' && style.next

    }

      onClick={onClick ? onClick : null} disabled={disabled}>
      {value === 'plus' && <Plus className={style.buttonPicture__plus}/>}
      {value === 'minus' && <Minus className={style.buttonPicture__minus}/>}
      {value === 'close' && <Close className={style.buttonPicture__close}/>}
      {value === 'image' && <Image className={style.buttonPicture__image}/>}
      {value === 'brownClose' && <SmallClose className={style.buttonPicture__brownClose}/>}
      {value === 'WhiteClose' && <SmallClose className={style.buttonPicture__whiteClose}/>}
      {value === 'RedClose' && <SmallClose className={style.buttonPicture__redClose}/>}
      {value === 'ArrowSmallRight' && <ArrowSmallRight className={style.buttonPicture__arrowSmall}/>}
      {value === 'ArrowSmallLeft' && <ArrowSmallLeft className={style.buttonPicture__arrowSmall}/>}
    </button>
  )
}

export default ButtonPicture
