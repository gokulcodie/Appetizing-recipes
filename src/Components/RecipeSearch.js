import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { useRecipe } from '../Contexts/RecipeProvider';
import { Avatar, CardHeader } from '@mui/material';

const filter = createFilterOptions();

export default function RecipeSearch() {
  const [value, setValue] = React.useState(null);
  const {recipeList,updateRecipeSearch} = useRecipe()
  React.useEffect(()=>{
     updateRecipeSearch(value)
  },[value])
  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
          setValue(newValue);
        } 
        else {
          setValue(newValue);
        }
      }}/* 
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option.recipeTitleData);
        if (inputValue !== '' && !isExisting) {
          filtered.push({
            inputValue,
            title: `Add "${inputValue}"`,
          });
        }

        return filtered;
      }}  */
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="recipe-search"
      options={recipeList}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option.recipeTitleData;
        }
        // Regular option
        return option.recipeTitleData;
      }}
      renderOption={(props, option) => 
          <CardHeader
                {...props}
                avatar={
                  <Avatar src={option.photoUrl} sx={{ width: 52, height: 52 }} aria-label="recipe">
                  </Avatar>
                }
                title={option.recipeTitleData}
                subheader={option.recipeTypeData}
           />}
      sx={{ width: 'auto',m:3,mb:1}}
      freeSolo
      renderInput={(params) => (
        <TextField {...params} label="Enter your recipe name" />
      )}
    />
  );
}


/* import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {useRecipe} from '../Contexts/RecipeProvider'
import { Avatar, CardHeader } from '@mui/material';

export default function RecipeSearch() {
   const {recipeList} = useRecipe()
   console.log(recipeList);
  return (
    <Autocomplete
      id="recipe-select-demo"
      sx={{ width: 'auto' ,m:3,mb:1}}
      options={recipeList}
      autoHighlight
      getOptionLabel={(option) => option.recipeTitleData}
      renderOption={(props, option) => (
        <Box component="li" {...props}>
            <CardHeader
                avatar={
                  <Avatar src={option.photoUrl} sx={{ width: 52, height: 52 }} aria-label="recipe">
                  </Avatar>
                }
                title={option.recipeTitleData}
                subheader={option.recipeTypeData}
              />
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Enter the recipe..."
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', 
          }}
        />
      )}
    />
  );
}
 */
