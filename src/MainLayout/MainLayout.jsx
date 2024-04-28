import {Outlet} from "react-router-dom";
import style from "./MainLayout.module.scss";
import Header from "../widgets/Header/Header.jsx";
import Footer from "../widgets/Footer/Footer.jsx";
import PopupMenu from "../widgets/Popup/PopupMenu/PopupMenu.jsx";
import {useState} from "react";

function MainLayout() {
  const [popupMenu, setPopupMenu] = useState(false)


  return (
    <div className={style.layout}>
      <Header setPopupMenu={setPopupMenu} popupMenu={popupMenu}/>
      <div className={style.content}>
        <Outlet/>
      </div>
      <Footer/>
      {popupMenu &&  <PopupMenu  setPopupMenu={setPopupMenu} popupMenu={popupMenu}/>}
    </div>
  );
}

export default MainLayout;