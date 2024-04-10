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
  const user = useUserData()
  const [instantGetCountsUserLikes, setInstantGetCountsUserLikes] = useState([])

  const COUNT_USER_LIKE =
    gql`
 query MyQuery {
  users {
    id
    recipes_aggregate {
      aggregate {
        count
      }
    }
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
  }
}`
  const getCountsUserLikes = useQuery(COUNT_USER_LIKE ).data?.users


useEffect(()=>{
  setInstantGetCountsUserLikes(getCountsUserLikes)
},[getCountsUserLikes])
  return (
    <section className={style.authorsPage}>
      <InputSearch/>
      <div className={style.authorsPage__box}>
        {instantGetCountsUserLikes?.map((obj, index)=>(
          <AuthorsCard {...obj} key={index}/>
        ))}

      </div>
    </section>
  )
}

export default AuthorsPage