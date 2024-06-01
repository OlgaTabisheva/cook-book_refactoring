import style from './LinkItem.module.scss'
import {Link} from "react-router-dom";

function LinkItem({linkTo, text, active, popupMenu, setPopupMenu, onClick}) {
  return (
    <Link to={linkTo} onClick={onClick ? onClick : () => popupMenu && setPopupMenu(!popupMenu)}
          className={!active ? style.linkItem : (style.linkItem && style.linkItem_active)}>
      {text}

    </Link>
  )
}

export default LinkItem