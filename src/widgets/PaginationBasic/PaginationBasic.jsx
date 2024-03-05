import style from "./PaginationBasic.module.scss";
import React, {useEffect, useState} from 'react';
import ButtonBasic from "../../shared/Buttons/ButtonBasic/ButtonBasic.jsx";
import ButtonChips from "../../shared/Buttons/ButtonChips/ButtonChips.jsx";

function PaginationBasic({totalPosts, paginate, currentPage}) {
  const [postPage] = useState(6)
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postPage); i++) {
    pageNumbers.push(i);
  }

  const [selectedPageNumber, setSelectedPageNumber] = useState()
  useEffect(() => {
    setSelectedPageNumber(currentPage)
  }, [currentPage])
  useEffect(() => {
    setSelectedPageNumber(1)
    paginate(1)
  }, [totalPosts])
  return (
    <nav className={style.pagination}>
      <ul className={style.pagination__box}>

        {pageNumbers.map(number => (
          <li key={number} className={style.pagination__item}>
            <button className={style.pagination__button} onClick={() => paginate(number)}>{number}</button>

          </li>
        ))}
        <ButtonChips text={'Дальше'}
                     onClick={(selectedPageNumber <= (pageNumbers.length - 1) & selectedPageNumber >= 1) ? () => paginate(selectedPageNumber + 1) : null}></ButtonChips>

      </ul>
    </nav>

  )
}

export default PaginationBasic