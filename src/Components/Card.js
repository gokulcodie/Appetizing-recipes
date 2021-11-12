import React,{useState,useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import NavigationIcon from '@mui/icons-material/Navigation';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

import {onSnapshot,collection,setDoc,doc,addDoc,deleteDoc} from '@firebase/firestore';
import db from '../Firebase'
import { FcLike } from 'react-icons/fc';
import { GiSkullWithSyringe } from 'react-icons/gi';
import {useAuth , AuthProvider} from '../Contexts/AuthProvider'
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import {recipeList,useRecipe} from '../Contexts/RecipeProvider'
import { Edit } from '@mui/icons-material';
import { Rating,Grid, ButtonBase} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  
  return (
    <div
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
    {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


const bull = (
  <Box
  component="span"
  sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
  </Box>
);

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export  function CardComp(
  {
  uploaderEmail='',
  recipeId='',  
  uploaderPic='NA',
  uploaderName='',
  uploadDate='date',
  photoUrl,
  videoUrl,
  recipeTitleData='name here...',
  recipeTypeData='type here...',
  stepss=[],
  ingredients=[],
  deletable=false,
  editable= false,
  rateable=false,
  wishlistable = false
}
) {
  const [expanded, setExpanded] = React.useState(false);


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDeleteRecipe = async(id)=>{
      const docRef=doc(db,'Recipes',id)
      await deleteDoc(docRef)
      console.log(id)
  }
  
  const [value, setValue] = React.useState(0);
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  const [activeStep, setActiveStep] = React.useState(0);
  
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  
  const handleReset = () => {
    setActiveStep(0);
  };
  
  const isVideo =(videoUrl === '')?
  <>
    <CardMedia
            component='img'
            height="250"
            alt="video not available"
            src={photoUrl}
            />
    <Typography sx={{ mb: 1.5 }} 
             color="text.secondary">
                Video not available!! 
              </Typography>
    
  </>
              :
              <CardMedia
              component='iframe'
              height="194"
              alt="video not available"
              sx={{ minWidth: 275 ,minHeight:200}}
              src={videoUrl}/>
              
  const steps = useState(stepss)
  const [wish,setWish] = useState(false)
  const {recipeList} = useRecipe()
  const [rating, setRating] = React.useState(0)
  const [currentRecipeCard,setCurrentRecipeCard] = useState(recipeList.filter((item)=>(item.id === recipeId)))
  const [oldWishlisters,setOldWishlisters] = useState(currentRecipeCard.map((item)=>item.wishlisters))
  const {currentUser}  = useAuth()
 async function handleAddWishedUser(currentRecipeCard,uid,recipeId){
  //   const wishlisters = [oldWishlisters.map((item)=>item),uid]
     //setOldWishlisters([...oldWishlisters,uid])
     const payLoad = {currentRecipeCard}
     console.log(currentRecipeCard.wishlisters);
     console.log(oldWishlisters);
     setWish(true)
    }

  
  function handleRemoveWishedUser(recipeId,uid){
     console.log("remove recipe id : "+recipeId)
     console.log("remove user id:"+uid)
     setWish(false)
  }
/*  
   useEffect(()=>{
     if(wish == true){
       handleAddWishedUser(recipeId,currentUser.uid)
     }
     else{
       handleRemoveWishedUser(recipeId,currentUser.uid)
     }
  },[wish])  */
  
  return (
    <Card sx={{ minWidth: 275 }}>
       <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="overview" {...a11yProps(0)} />
          <Tab label="video" {...a11yProps(1)} />
          <Tab label="ingredients" {...a11yProps(2)}/>
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
          <CardMedia
            component='img'
            sx={{ minWidth: 275 ,minHeight:275,maxHeight:275}}
            alt="Paella dish"
            src={photoUrl}
          />
              <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Recipe Title
              </Typography>
              <Typography variant="h6" component="div">
                {recipeTitleData}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Type
              </Typography>
              <Typography variant="h6" component="div">
                   {recipeTypeData}
              </Typography>
            </CardContent>
      </TabPanel>
      <TabPanel value={value} index={1}>
        {isVideo}
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Typography paragraph>click <ExpandMoreIcon /> to steps and ingredients:</Typography>
        <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
       <Collapse in={expanded} timeout="auto" unmountOnExit> 
       <CardContent>
         <Typography paragraph>ingredients:</Typography>
          {ingredients.map((item)=>(
            <Stack sx={{ width: '100%' }} spacing={2} key={item.id}>
             <Alert>
                <Breadcrumbs aria-label="breadcrumb">
                <Typography color="text.primary">{item.name}</Typography>
                <Typography color="text.primary">{item.qty}</Typography>
                <Typography color="text.primary">{item.note}</Typography>
                </Breadcrumbs>
             </Alert>
            </Stack>
             ))
            }  
          <Typography paragraph>steps : </Typography>
        </CardContent>
        <CardContent>
          <Box sx={{ maxWidth: 400 }}>
      {stepss.map((item)=>(
            <Stack sx={{ width: '100%' }} spacing={2} key={item.id}>
             <Alert>
                <Typography color="text.primary">{item.step}</Typography>
             </Alert>
            </Stack>
             ))
            }  
    </Box>
        </CardContent>
      </Collapse>
      </TabPanel>
    </Box>
       <Paper sx={{ p: 2, margin: 'auto', maxWidth: 500, flexGrow: 1 }}>
       <Grid item xs container direction="row" spacing={2} sx={{ml:0}}>
       <Grid sx={{ '& > :not(style)': { m: 1 } }} direction="column">
         {
          (deletable == true)?
          <Fab color="primary" aria-label="add">
        <DeleteIcon onClick={()=>handleDeleteRecipe(recipeId)}/>
      </Fab> 
          :
          <></>
        }
      {
          (editable == true)?
      <Fab color="secondary" aria-label="edit">
        <EditIcon />
      </Fab>
          :
          <></>
        }
        {/* {
          (wishlistable == true)?
          <>
          <Fab color="primary" aria-label="like">
          {
            (wish )?
            <FavoriteIcon style={{color:'white'}} onClick={()=>handleRemoveWishedUser(recipeId,currentUser.uid)}/>   
            :
            <FavoriteBorderIcon onClick={()=>handleAddWishedUser(currentRecipeCard,currentUser.uid,recipeId)}/>
          }
        </Fab> 
        <Typography variant="body2" color="text.secondary">
                12,000 wishlisters
        </Typography>
        </>
          :
          <></>
        } */}
        </Grid>
                {/*   <Grid item>
               <Rating
                name="simple-controlled"
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
              />
              <Typography variant="body2" color="text.secondary">
                1,12,000 ratings
              </Typography>
          </Grid>  */}
       <Grid>
                       <CardHeader
                avatar={
                  (uploaderPic === null)?
                  <Avatar sx={{ width: 32, height: 32 }} aria-label="recipe">
                  </Avatar>
                  :
                  <Avatar  src={uploaderPic} sx={{ width: 52, height: 52 }} aria-label="recipe">
                  </Avatar>
                }
                title={(uploaderName === '')?uploaderEmail:uploaderName}
                subheader={uploadDate}
              />
       </Grid>
       </Grid>
    </Paper>
    </Card>
  );
}
