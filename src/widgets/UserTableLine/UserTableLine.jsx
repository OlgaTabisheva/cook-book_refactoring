import style from "./UserTableLine.module.scss";
import test from './../../assets/test.jpg'
import {ReactComponent as Trash} from '../../assets/trash.svg';
import {ReactComponent as Check} from '../../assets/check-circle.svg';
import {ReactComponent as Stop} from '../../assets/stop-circle.svg';

function UserTableLine({
                         avatarUrl,
                         email,
                         displayName,
                         disabled
                       }) {


  return (
    <section className={style.userTableLine}>
      <div className={style.userTableLine__boxName}>
        <img alt={'user'} src={avatarUrl} className={style.userTableLine__img}/>
        <p className={style.userTableLine__name}>{displayName}</p>
      </div>
      <p className={style.userTableLine__mail}>{email}</p>
      <div className={style.userTableLine__boxImg}>
        {!disabled ? <Check className={style.userTableLine__check}/> : <Stop className={style.userTableLine__trash}/>}
        <Trash className={style.userTableLine__trash}/>
      </div>
    </section>
  )
}

export default UserTableLine