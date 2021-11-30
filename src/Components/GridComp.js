import React,{useState,useEffect} from 'react';
import Grid from '@mui/material/Grid';
import {CardComp} from './Card'
import { useRecipe,RecipeProvider } from '../Contexts/RecipeProvider';
import RecipeSearch from './RecipeSearch';
import Alert from '@mui/material/Alert';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import LoadingComp from './LoadingComp';
import '../loader.css'
import SkeletonComp from './SkeletonComp';
import { Offline ,Online} from 'react-detect-offline';

export default function GridComp() {
  const {recipeList,recipeSearch,setRecipeList} = useRecipe()

  const empty=[]
  
  return (
    <>
    <RecipeSearch/>
    {
    (recipeSearch)?
    <>
    <Alert sx={{m:3}} icon={<PrecisionManufacturingIcon sx={{ fontSize: 56 }} />} severity="success">
      found for "{recipeSearch.recipeTitleData}"
    </Alert>
    <Grid container spacing={2} sx={{ p: 3 }}>
    <Grid item xs={12} sm={6} md={4} key={recipeSearch.id}>
        <CardComp
          recipeId={recipeSearch.id}
          uploaderEmail={recipeSearch.email}
          uploaderPic={(recipeSearch?.profilePhotoUrl)?recipeSearch.profilePhotoUrl:null}
          uploadDate={recipeSearch.timeStamp} 
          uploaderName={recipeSearch.userName} 
          photoUrl={recipeSearch.photoUrl} 
          videoUrl={recipeSearch.videoUrl} 
          recipeTitleData={recipeSearch.recipeTitleData}
          recipeTypeData={recipeSearch.recipeTypeData}
          ingredients={recipeSearch.ing}
          stepss={recipeSearch.steps}
          />
        </Grid>
        </Grid>
    </>
    :
    <Grid container spacing={2} sx={{ p: 3 }}>
     {  
     /* Array.isArray(recipeList ) && empty.length */
       (recipeList.length === 0)?
        <LoadingComp/>
       :
       recipeList.map((item)=>(
        <Grid item xs={12} sm={6} md={4} key={item.id}>
        <CardComp
          recipeId={item.id}
          uploaderEmail={item.email}
          uploaderPic={(item?.profilePhotoUrl)?item.profilePhotoUrl:null}
          uploadDate={item.timeStamp} 
          uploaderName={item.userName} 
          photoUrl={item.photoUrl} 
          videoUrl={item.videoUrl} 
          recipeTitleData={item.recipeTitleData}
          recipeTypeData={item.recipeTypeData}
          ingredients={item.ing}
          stepss={item.steps}
          />
        </Grid>
       ))
     }
    </Grid>
    }
    </>
  );
}

/* 
recipeList.map((item)=>(
        <Grid item xs={12} sm={6} md={4} key={item.id}>
        <CardComp
          recipeId={item.id}
          uploaderEmail={item.email}
          uploaderPic={(item?.profilePhotoUrl)?item.profilePhotoUrl:null}
          uploadDate={item.timeStamp} 
          uploaderName={item.userName} 
          photoUrl={item.photoUrl} 
          videoUrl={item.videoUrl} 
          recipeTitleData={item.recipeTitleData}
          recipeTypeData={item.recipeTypeData}
          ingredients={item.ing}
          stepss={item.steps}
          />
        </Grid>
       ))
*/

/* 
 <Grid container spacing={2} sx={{ p: 3 }}>
     {  
       recipeList.map((item)=>(
        <Grid item xs={12} sm={6} md={4} key={item.id}>
        <CardComp
          recipeId={item.id}
          uploaderEmail={item.email}
          uploaderPic={(item?.profilePhotoUrl)?item.profilePhotoUrl:null}
          uploadDate={item.timeStamp} 
          uploaderName={item.userName} 
          photoUrl={item.photoUrl} 
          videoUrl={item.videoUrl} 
          recipeTitleData={item.recipeTitleData}
          recipeTypeData={item.recipeTypeData}
          ingredients={item.ing}
          stepss={item.steps}
          />
        </Grid>
       ))
       }
    </Grid>
*/
