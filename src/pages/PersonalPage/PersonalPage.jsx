import styles from "./PersonalPage.module.scss";
import {useAuthenticated, useSignOut, useUserData} from "@nhost/react";
import React, {useCallback, useEffect, useState,} from "react";
import ButtonChips from "../../shared/Buttons/ButtonChips/ButtonChips.jsx";
import UserProfile from "../../widgets/UserProfile/UserProfile.jsx";
import FavoritesRecipes from "../../widgets/FavoritesRecipes/FavoritesRecipes.jsx";
import UserRecipes from "../../widgets/UserRecipes/UserRecipes.jsx";


export const PersonalPage = () => {
  const [changeButton, setChangeButton] = useState('Профиль')
  return (
    <section className={styles.personalPage}>
      <div className={styles.personalPage__chips}>
        <ButtonChips text={'Избранное'} onClick={() => setChangeButton('Избранное')}
                     active={changeButton === 'Избранное' ? 'active' : ''}/>
        <ButtonChips text={'Мои Рецепты'} onClick={() => setChangeButton('Мои Рецепты')}
                     active={changeButton === 'Мои Рецепты' ? 'active' : ''}/>
        <ButtonChips text={'Профиль'} onClick={() => setChangeButton('Профиль')}
                     active={changeButton === 'Профиль' ? 'active' : ''}/>
      </div>
      <div className={styles.personalPage__box}>
        {changeButton === 'Избранное' ? <FavoritesRecipes/> : null}
        {changeButton === 'Мои Рецепты' ? <UserRecipes/> : null}
        {changeButton === 'Профиль' ? <UserProfile/> : null}

      </div>
    </section>
  );
}