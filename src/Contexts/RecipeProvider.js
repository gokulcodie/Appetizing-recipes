import React, { useContext, useState, useEffect } from "react"
import {onSnapshot,collection,setDoc,doc,addDoc,deleteDoc} from '@firebase/firestore';
import db from '../Firebase'
import { TryOutlined } from "@mui/icons-material";
import { Offline } from "react-detect-offline";


const RecipeContext = React.createContext()


export function useRecipe() {
  return useContext(RecipeContext)
}


export  function RecipeProvider({ children }) {
  const [recipeList, setRecipeList] = useState([])
  const [recipeSearch,setRecipeSearch] = useState(null)
  
  function updateRecipeSearch(value){
     setRecipeSearch(value)
  }

    useEffect(
    () => 
    onSnapshot(collection(db,'Recipes'),(snapshot)=>{
        setRecipeList(snapshot.docs.map((doc) => ({...doc.data(),id:doc.id})))
      })
  ,[]
  );

    const value={
        recipeList,
        updateRecipeSearch,
        recipeSearch,
        setRecipeList
    }
    return (
    <RecipeContext.Provider value={value}>
      {children}
    </RecipeContext.Provider>
    )
}
