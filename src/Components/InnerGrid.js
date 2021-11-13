import { Grid } from '@mui/material'
import React from 'react'
import { CardComp } from './Card'

export const InnerGrid = ({item}) => {
    return (
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
          deletable={true}
          />
        </Grid>
    )
}
