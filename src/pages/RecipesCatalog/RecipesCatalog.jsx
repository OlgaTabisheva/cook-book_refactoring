import style from './RecipesCatalog.module.scss'
import InputSearch from "../../shared/InputSearch/InputSearch.jsx";
import ButtonChips from "../../shared/Buttons/ButtonChips/ButtonChips.jsx";
import RecipeCard from "../../widgets/RecipeCard/RecipeCard.jsx";
import {useEffect, useState} from "react";
import PaginationBasic from "../../widgets/PaginationBasic/PaginationBasic.jsx";
import {Link, useLocation, useNavigate} from "react-router-dom";
import PopupBasic from "../../widgets/Popup/PopupBasic/PopupBasic.jsx";


function RecipesCatalog({
                          allCategories,
                          setSelectedCategory,
                          chosenCategory,
                          selectedCategory,
                          instantLikes,
                          setInstantLikes,
                          instantAddRecipe,
                          isAuthenticated,

                        }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [postPage] = useState(21)
  const indexOfLastPost = currentPage * postPage;
  const indexOfFirstPost = indexOfLastPost - postPage;
  const currentPosts = instantAddRecipe?.recipes.slice(indexOfFirstPost, indexOfLastPost);
  const [chosenTextCategoryLocal, setChosenTextCategoryLocal] = useState();
  const currentPostsChosenCategory = chosenCategory?.recipes.slice(indexOfFirstPost, indexOfLastPost);
  const [searchValue, setSearchValue] = useState();
  const [unauthorizedPopup, setUnauthorizedPopup] = useState(false);


  const navigate = useNavigate();
  const paginate = pageNumber => setCurrentPage(pageNumber);
  function handleOnClick(obj) {
    setSelectedCategory(obj ? obj?.number : 0)
    setChosenTextCategoryLocal(obj)

  }
  const handleClick = (e) => {
    navigate({
      pathname: `/search/${searchValue}`,
      query: {searchValue: searchValue}
  });


  }
  return (
    <div className={style.recipesCatalog}>
      <div className={style.recipesCatalog__search}>

      <InputSearch
        placeholder="search"
        onChange={(e) => (setSearchValue(e.target.value))}
        id="search"
        name="search"
        type="search"
        onClick={(e)=>handleClick(e.target.value)}
      />

      </div>
      <div className={style.recipesCatalog__box}>
        <ButtonChips text={'Все'} onClick={()=>handleOnClick(-1)} />
        {allCategories?.categories?.map((obj) => (
          <ButtonChips key={obj.number} text={obj ? obj?.category : ''} onClick={()=>handleOnClick(obj)} chosenText={chosenTextCategoryLocal?.category} ></ButtonChips>
        ))}

      </div>
      <div className={style.recipesCatalog__boxCatalog}>
        <div className={style.recipesCatalog__catalog}>

          {selectedCategory > 0 ?
            currentPostsChosenCategory?.map((obj) => (
              <RecipeCard isBtnEdit={false}
                          key={obj.id} {...obj}
                          instantLikes={instantLikes}
                          setInstantLikes={setInstantLikes}
                          isAuthenticated={isAuthenticated}
                          unauthorizedPopup={unauthorizedPopup}
                          setUnauthorizedPopup={setUnauthorizedPopup}

              />
            ))

            :
            currentPosts?.map((obj) => (
              <RecipeCard isBtnEdit={false}
                          key={obj.id} {...obj}
                          instantLikes={instantLikes}
                          setInstantLikes={setInstantLikes}
                          isAuthenticated={isAuthenticated}
                          setUnauthorizedPopup={setUnauthorizedPopup}

              />
            ))}

        </div>
        {((selectedCategory > 0) ? chosenCategory?.recipes?.length : instantAddRecipe?.recipes?.length) > 21 &&  <PaginationBasic currentPage={currentPage} postPage={postPage}
                         totalPosts={(selectedCategory > 0) ? chosenCategory?.recipes?.length : instantAddRecipe?.recipes?.length}
                         paginate={paginate}
                         setCurrentPage/>}
      </div>
      {unauthorizedPopup === true && <div className={style.recipesCatalog__popup}>
        <PopupBasic text={'К сожалению функция "поставить лайк" доступна только авторизованным пользователям'} title={'Если у вас еще нет аккаунта, пожалуйста, зарегистрируйтесь'}
                    textButtonGo={'Зарегистрироваться'} popupCloseAddRecipe={unauthorizedPopup} setPopupCloseAddRecipe={setUnauthorizedPopup}
                    exitClick={()=>navigate(`/auth`)}   />
        <div className={style.recipesCatalog__overlay}></div>

      </div>}
    </div>
  )
}

export default RecipesCatalog