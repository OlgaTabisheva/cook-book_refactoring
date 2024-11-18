import style from './PortionsCounter.module.scss'
import ButtonPicture from "../../shared/Buttons/ButtonPicture/ButtonPicture.jsx";
import {useEffect, useState} from "react";


function PortionsCounter({setCountPortions, fullRecipeFromFullRecipe, countPortions, fullRecipe}) {
  const [counter, setCounter] = useState(countPortions ? countPortions : 1)

  useEffect(() => {
    if (counter >= 2) {
      setCountPortions(counter)
    }


  }, [counter])
  useEffect(() => {
    if (fullRecipe > 1) {
      setCounter(fullRecipe)
    }
  }, [fullRecipe])

  return (

    <div className={style.portionsCounter__counter}>
      <ButtonPicture value={'minus'} disabled={counter === 1 || fullRecipeFromFullRecipe?.portions > 0} size={'normal'}
                     onClick={() => setCounter(counter - 1)}/>
      <p
        className={style.portionsCounter__counterText}> {fullRecipeFromFullRecipe?.portions > 0 ? fullRecipeFromFullRecipe?.portions : counter}</p>

      <ButtonPicture value={'plus'} disabled={fullRecipeFromFullRecipe?.portions > 0} size={'normal'}
                     onClick={() => setCounter(counter + 1)}/>
    </div>
  )
}

export default PortionsCounter