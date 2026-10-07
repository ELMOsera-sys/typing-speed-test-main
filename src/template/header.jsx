import Icon from "./icon.jsx";
import {useContext} from "react"
import {StateContext} from "./Context/stateContext.jsx"

function Header(){
    const {state} = useContext(StateContext);
    return (
        <header>
      <div className="header flex justify-between p-1 mb-10">
        <picture>
          <source media="(min-width: 768px)" srcSet="assets/images/logo-large.svg" />
          <img src="./assets/images/logo-small.svg" />
        </picture>
    
        <div className="flex gap-1 items-center">
          <Icon name="personalBest" className="w-5 h-5" />
          <p className="ml-1.5 text-neutral-400">best:</p>
          <p className="text-neutral-300 best-wbm">{state.bestWpm} WPM</p>
        </div>
      </div>
    </header>
    )
}

export default Header
