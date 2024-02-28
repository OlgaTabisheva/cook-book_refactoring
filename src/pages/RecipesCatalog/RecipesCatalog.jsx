import style from './RecipesCatalog.module.scss'
import InputSearch from "../../shared/InputSearch/InputSearch.jsx";
import ButtonChips from "../../shared/Buttons/ButtonChips/ButtonChips.jsx";
import RecipeCard from "../../widgets/RecipeCard/RecipeCard.jsx";
import {useState} from "react";


function RecipesCatalog({
                          allCategories,
                          setSelectedCategory,
                          chosenCategory,
                          selectedCategory,
                          instantLikes,
                          setInstantLikes,
                          instantAddRecipe,
                          isAuthenticated

                        }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [postPage] = useState(21)
  const indexOfLastPost = currentPage * postPage;
  const indexOfFirstPost = indexOfLastPost - postPage;
  const currentPosts = instantAddRecipe?.recipes.slice(indexOfFirstPost, indexOfLastPost);
  const [searchValue, setSearchValue] = useState()
  const currentPostsChosenCategory = chosenCategory?.recipes.slice(indexOfFirstPost, indexOfLastPost);
  return (
    <section className={style.recipesCatalog}>
      <InputSearch/>
      <div className={style.recipesCatalog__box}>
        {allCategories?.categories?.map((obj) => (
          <ButtonChips text={obj ? obj.category : ''}></ButtonChips>
        ))}
      </div>
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
    </section>
  )
}

export default RecipesCatalog