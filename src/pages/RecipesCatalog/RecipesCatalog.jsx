import style from './RecipesCatalog.module.scss'
import InputSearch from "../../shared/InputSearch/InputSearch.jsx";
import ButtonChips from "../../shared/Buttons/ButtonChips/ButtonChips.jsx";
import RecipeCard from "../../widgets/RecipeCard/RecipeCard.jsx";
import {useState} from "react";
import PaginationBasic from "../../widgets/PaginationBasic/PaginationBasic.jsx";


function RecipesCatalog({
                          allCategories,
                          setSelectedCategory,
                          chosenCategory,
                          selectedCategory,
                          instantLikes,
                          setInstantLikes,
                          instantAddRecipe,
                          isAuthenticated, setChosenTextCategory, chosenTextCategory

                        }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [postPage] = useState(21)
  const indexOfLastPost = currentPage * postPage;
  const indexOfFirstPost = indexOfLastPost - postPage;
  const currentPosts = instantAddRecipe?.recipes.slice(indexOfFirstPost, indexOfLastPost);
  const [searchValue, setSearchValue] = useState()
  const currentPostsChosenCategory = chosenCategory?.recipes.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  function handleOnClick(obj) {
    setSelectedCategory(obj ? obj.number : 0)
    setChosenTextCategory(obj)
    console.log(obj)
  }

  return (
    <section className={style.recipesCatalog}>
      <InputSearch/>
      <div className={style.recipesCatalog__box}>
        {allCategories?.categories?.map((obj) => (
          <ButtonChips text={obj ? obj.category : ''} onClick={()=>handleOnClick(obj)} chosenText={chosenTextCategory} ></ButtonChips>
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