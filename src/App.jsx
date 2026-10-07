import Header from "./template/header"
import StatBar from "./template/statBar"
import Difficulty from "./template/select/difficulty.jsx"
import Mode from "./template/select/mode.jsx"
import Text from "./template/text.jsx"
import Overlay from "./template/overlay.jsx"
import ResetBtn from "./template/resetBtn.jsx"
import Result from "./template/result.jsx"

import {DataProvider} from "./template/Context/dataContext.jsx"
import {StateProvider} from "./template/Context/stateContext.jsx"
import {StateContext} from "./template/Context/stateContext.jsx"
import {useContext} from "react"


function AppContent() {
  const {state}=useContext(StateContext);

  return (
    < >
    <Header />
    <main className="flex flex-col gap-3 relative">
    {!state.ended && <section className="menu-section flex flex-col gap-4 md:px-20 z-30" >
        <div className="flex flex-col gap-5
          md:flex-row md:justify-center ">

          <StatBar />

          <div className="option-div flex gap-1 justify-around mt-2 w-full md:mt-0 md:flex-row">
          
          <Difficulty />
          <Mode />

          </div>
        </div>
        <hr className="text-neutral-500" />
      </section>} 
    
      <section className="test-section relative flex flex-col items-center gap-1.5">
        
    
       {!state.ended && <Text />}
        <hr className="text-neutral-500 w-full " hidden={state.ended} />
        
      </section>
       {!state.ended && <Overlay />}
      
      {!state.ended && (state.started &&  <ResetBtn text="Restart Test" />)}
      {state.ended && <Result />}
    </main>
    </>
  )
}


function App() {
  return (
    <DataProvider>
      <StateProvider>
        <AppContent />
      </StateProvider>  
    </DataProvider>
  )
}

export default App