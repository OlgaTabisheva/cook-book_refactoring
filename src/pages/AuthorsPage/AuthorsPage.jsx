import style from './AuthorsPage.module.scss'
import InputSearch from "../../shared/InputSearch/InputSearch.jsx";
import ButtonChips from "../../shared/Buttons/ButtonChips/ButtonChips.jsx";
import RecipeCard from "../../widgets/RecipeCard/RecipeCard.jsx";
import {useEffect, useState} from "react";
import AuthorsCard from "../../widgets/AuthorsCard/AuthorsCard.jsx";
import RecipeCardTest from "../../test/RecipeCardTest/RecipeCardTest.jsx";
import {gql, useQuery} from "@apollo/client";
import {useUserData} from "@nhost/react";


function AuthorsPage({}) {
  const [instantGetCountsUserLikes, setInstantGetCountsUserLikes] = useState([])
  const [inputSearchText, setInputSearchText] = useState();
  const [searchString, setSearchString] = useState();
  const COUNT_USER_LIKE =
    gql`
 query MyQuery {
  users {
    id
 
    like {
      recipe {
        likes_aggregate {
          aggregate {
            count
          }
        }
      }
    }
    displayName
    avatarUrl
  }
}`

  const GET_SEARCH_USERS = gql`
  query MyQuery {
    users(where: {displayName: {_iregex: "${searchString}"}}) {
         id
   
    like {
      recipe {
        likes_aggregate {
          aggregate {
            count
          }
        }
      }
    }
    displayName
    avatarUrl
    }}
`
  const getCountsUserLikes = useQuery(COUNT_USER_LIKE).data?.users
  const resultSearchUsersFromServer = useQuery(GET_SEARCH_USERS).data?.users
  const [instantSearchUsers, setInstantSearchUsers] = useState([]);

  function handleSearchValue(e) {
    setSearchString(inputSearchText)
    setInstantSearchUsers(resultSearchUsersFromServer)
  }


  useEffect(() => {
    setInstantGetCountsUserLikes(getCountsUserLikes)
  }, [getCountsUserLikes])

  useEffect(() => {
    setInstantSearchUsers(resultSearchUsersFromServer)
  }, [resultSearchUsersFromServer])


  return (
    <section className={style.authorsPage}>
      <InputSearch onChange={(e) => (setInputSearchText(e.target.value))}
                   id="searchUser"
                   name="searchUser"
                   type="search"
                   placeholder={'Введите имя'}
                   onClick={(e) => handleSearchValue(e.target.value)}
                   searchValue={searchString}
                   value={inputSearchText}


      />
      <div className={style.authorsPage__box}>

        {(searchString < 1 || searchString === undefined) ?
          instantGetCountsUserLikes?.map((obj, index) => (
            <AuthorsCard {...obj} key={index}/>
          )) : instantSearchUsers?.map((obj, index) => (
            <AuthorsCard {...obj} key={index}/>
          ))
        }
      </div>
    </section>
  )
}

export default AuthorsPage