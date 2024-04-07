import style from './../RecipesCatalog/RecipesCatalog.module.scss'

import {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {gql, useQuery} from "@apollo/client";
import InputSearch from "../../shared/InputSearch/InputSearch.jsx";
import RecipeCard from "../../widgets/RecipeCard/RecipeCard.jsx";
import RecipePhotoBlock from "../../widgets/RecipePhotoBlock/RecipePhotoBlock.jsx";
import AdditionalRecipes from "../../widgets/AdditionalRecipes/AdditionalRecipes.jsx";




function SearchPage(props, {setInstantLikes, isAuthenticated, instantLikes, searchValue, setSearchValue}) {

  let location = useLocation();
  let searchTextFromRoute = decodeURI(location.pathname.slice(8))
  const [inputSearchText, setInputSearchText] = useState();
  const [searchString, setSearchString] = useState();
  const location1 = useLocation();

  const GET_SEARCH_NAME = gql`
query MyQuery {
  recipes(where: {name: {_ilike: "%${searchString}%"}}) {
      id
      date
      name
      food
      long
      description
      photo
      recipes_category
  }
}
`

  const resultSearchFromServer = useQuery(GET_SEARCH_NAME).data
  const [instantSearchRecipes, setInstantSearchRecipes] = useState();

 /* useEffect(() => {
    setInputSearchText(searchTextFromRoute)
  }, [searchTextFromRoute])*/

  useEffect(() => {
    setInstantSearchRecipes(resultSearchFromServer)
  }, [resultSearchFromServer])

  useEffect(() => {
    if (searchTextFromRoute) {
      setSearchString(searchTextFromRoute)
    }
  }, [])

  function handleSearchValue(e) {
    setSearchString(inputSearchText)
    setInstantSearchRecipes(resultSearchFromServer)
    location1(`/search/#/${e}`);
  }


  //const paginate = pageNumber => setCurrentPage(pageNumber);


  return (
    <section className={style.recipesCatalog}>
      <InputSearch onChange={(e) => (setInputSearchText(e.target.value))}
                   id="searchRecipe"
                   name="searchRecipe"
                   type="search"
                   placeholder={searchTextFromRoute}
                   onClick={(e)=>handleSearchValue(e.target.value)}
                   searchValue={searchValue}

      />

      <div className={style.recipesCatalog__boxCatalog}>
        <div className={style.recipesCatalog__catalog}>

          {instantSearchRecipes?.recipes?.length > 0 ?
            instantSearchRecipes?.recipes?.map((obj) => (
              <RecipeCard isBtnEdit={false}
                      key={obj.id} {...obj}
                      instantLikes={instantLikes}
                      setInstantLikes={setInstantLikes}
                      isAuthenticated={isAuthenticated}
              />)) : "ничего не найдено."
          }
        </div>
        {!instantSearchRecipes?.recipes?.length > 0 && <AdditionalRecipes/>}
      {/*  <PaginationBasic currentPage={currentPage} postPage={postPage}
                         totalPosts={(selectedCategory > 0) ? chosenCategory?.recipes?.length : instantAddRecipe?.recipes?.length}
                         paginate={paginate}
                         setCurrentPage/>*/}
      </div>
    </section>
  )
}

export default SearchPage