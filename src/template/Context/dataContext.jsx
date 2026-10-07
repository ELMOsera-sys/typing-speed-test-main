import {useState,useEffect,createContext} from "react" ;

export const DataContext=createContext();



export function DataProvider({children}){

    const [data,setData]=useState({});
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(null);



    useEffect(()=>{
        try{
              setLoading(true);
            async function fetchData(){
                const response=await fetch("data.json");
                const data=await response.json();
                setData(data);
                setLoading(false);
            }
            fetchData();
        }
        catch(error){
                setError(error);
                setLoading(false);
            }
    },[])




    return(
        <DataContext.Provider value={{data,loading,error}}>
            {children}
        </DataContext.Provider>
    )
}