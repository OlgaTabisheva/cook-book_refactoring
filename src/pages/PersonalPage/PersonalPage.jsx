import styles from "./PersonalPage.module.scss";
import {useAuthenticated, useSignOut, useUserData} from "@nhost/react";
import React, {useCallback, useEffect, useState, } from "react";
import ButtonChips from "../../shared/Buttons/ButtonChips/ButtonChips.jsx";
import UserProfile from "../../widgets/UserProfile/UserProfile.jsx";




export const PersonalPage = () => {

  return (
    <section className={styles.personalPage}>
<div className={styles.personalPage__chips}>
  <ButtonChips text={'Избранное'}/>
  <ButtonChips text={'Мои Рецепты'}/>
  <ButtonChips text={'Профиль'}/>
</div>
<div className={styles.personalPage__box}>
<UserProfile/>
</div>
    </section>
  );
}