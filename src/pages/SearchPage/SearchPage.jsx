import style from './../RecipesCatalog/RecipesCatalog.module.scss'

import {useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {gql, useQuery} from "@apollo/client";
import InputSearch from "../../shared/InputSearch/InputSearch.jsx";
import RecipeCard from "../../widgets/RecipeCard/RecipeCard.jsx";
import RecipePhotoBlock from "../../widgets/RecipePhotoBlock/RecipePhotoBlock.jsx";
import AdditionalRecipes from "../../widgets/AdditionalRecipes/AdditionalRecipes.jsx";


function SearchPage(props, {setInstantLikes, isAuthenticated, instantLikes, searchValue,}) {

  let location = useLocation();
  let searchTextFromRoute = decodeURI(location.pathname.slice(8))

  const [inputSearchText, setInputSearchText] = useState();
  const [searchString, setSearchString] = useState();
  const navigate = useNavigate();

  const GET_SEARCH_NAME = gql`
query MyQuery {
  recipes(where: {name: {_ilike: "%${searchString}%"}}) {
        category {
      category
    }
   duration {
      duration
    }
      id
      date
      name
      food
      description
      photo
      steps
  }
}
`


  const resultSearchFromServer = useQuery(GET_SEARCH_NAME).data?.recipes
  const [instantSearchRecipes, setInstantSearchRecipes] = useState([]);

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
    navigate({
      pathname: `/search/${inputSearchText}`,

    })
  }


  //const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <section className={style.recipesCatalog}>
      <div className={style.recipesCatalog__search}>
        <InputSearch onChange={(e) => (setInputSearchText(e.target.value))}
                     id="searchRecipe"
                     name="searchRecipe"
                     type="search"
                     placeholder={searchTextFromRoute}
                     onClick={(e) => handleSearchValue(e.target.value)}
                     searchValue={searchValue}

        />
      </div>

      <div className={style.recipesCatalog__boxCatalog}>
        <div className={style.recipesCatalog__catalog}>

          {instantSearchRecipes?.length > 0 &&
            instantSearchRecipes?.map((obj) => (
              <RecipeCard isBtnEdit={false}
                          key={obj.id} {...obj}
                          instantLikes={instantLikes}
                          setInstantLikes={setInstantLikes}
                          isAuthenticated={isAuthenticated}
              />))
          }
        </div>

        {!instantSearchRecipes?.length > 0 && <div className={style.recipesCatalog__boxAdd}>
          <h3 className={style.recipesCatalog__textAdd}>К сожалению по запросу «{inputSearchText}» ничего не найдено,
            попробуйте скорректировать запрос</h3>
          <AdditionalRecipes/></div>}
        {/*  <PaginationBasic currentPage={currentPage} postPage={postPage}
                         totalPosts={(selectedCategory > 0) ? chosenCategory?.recipes?.length : instantAddRecipe?.recipes?.length}
                         paginate={paginate}
                         setCurrentPage/>*/}
      </div>
    </section>
  )
}

export default SearchPage