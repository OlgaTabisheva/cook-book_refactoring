import style from './RecipesCatalog.module.scss'
import InputSearch from "../../shared/InputSearch/InputSearch.jsx";
import ButtonChips from "../../shared/Buttons/ButtonChips/ButtonChips.jsx";
import RecipeCard from "../../widgets/RecipeCard/RecipeCard.jsx";
import {useEffect, useState} from "react";
import PaginationBasic from "../../widgets/PaginationBasic/PaginationBasic.jsx";
import {Link, useLocation, useNavigate} from "react-router-dom";


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
  const [chosenTextCategoryLocal, setChosenTextCategoryLocal] = useState()
  const currentPostsChosenCategory = chosenCategory?.recipes.slice(indexOfFirstPost, indexOfLastPost);
  const [searchValue, setSearchValue] = useState()
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
    <section className={style.recipesCatalog}>
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

              />
            ))

            :
            currentPosts?.map((obj) => (
              <RecipeCard isBtnEdit={false}
                          key={obj.id} {...obj}
                          instantLikes={instantLikes}
                          setInstantLikes={setInstantLikes}
                          isAuthenticated={isAuthenticated}

              />
            ))}

        </div>
        <PaginationBasic currentPage={currentPage} postPage={postPage}
                         totalPosts={(selectedCategory > 0) ? chosenCategory?.recipes?.length : instantAddRecipe?.recipes?.length}
                         paginate={paginate}
                         setCurrentPage/>
      </div>
    </section>
  )
}

export default RecipesCatalog