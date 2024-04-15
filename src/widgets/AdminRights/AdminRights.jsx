import style from './AdminRights.module.scss'
import AdminCard from "../AdminCard/AdminCard.jsx";
import edit from  './../../assets/IconEdit.svg'
import publish from  './../../assets/IconFilePublish.svg'
import userIcon from  './../../assets/IconUser.svg'
import plate from  './../../assets/IconPlate.svg'
import circle from  './../../assets/IconMessage-circle.svg'
import {Navigate, useNavigate} from "react-router-dom";

const adminR = [
  {
    title: 'На модерации',
    icon: edit
  },
  {
    title: 'Опубликованные',
    icon: publish
  },
  {
    title: 'Пользователи',
    icon: userIcon
  },
  {
    title: 'Категории',
    icon: plate
  },
  {
    title: 'Жалобы',
    icon: circle
  },
]

function AdminRights() {
  return (
    <section
      className={style.adminRights}>
      <div className={style.adminRights__box}>

      {adminR?.map((obj, index)=>(

  <AdminCard key={index} {...obj} />

      ))}
      </div>
    </section>
  )
}

export default AdminRights
