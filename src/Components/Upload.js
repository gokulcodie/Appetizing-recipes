import React,{useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import { useNavigate} from "react-router-dom"
import Container from '@mui/material/Container';
import { CssBaseline } from '@mui/material';
import { GiCampCookingPot } from "react-icons/gi";
import Typography from '@mui/material/Typography'; 
import {makeStyles} from '@mui/styles'; 
import { spacing, styled, width } from '@mui/system';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Icon from '@mui/material/Icon';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import {onSnapshot,collection,setDoc,doc,addDoc,deleteDoc} from '@firebase/firestore';
import db from '../Firebase' 
import GridComp from './GridComp';
import {AuthProvider,useAuth} from '../Contexts/AuthProvider'

import {Link,useHistory} from 'react-router-dom'

import {CardComp} from './Card'
import { useRecipe,RecipeProvider } from '../Contexts/RecipeProvider';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert sx={{mb:3}} elevation={6} ref={ref} variant="filled" {...props} />;
});

const style = {
  width: '100%',
  bgcolor: 'background.paper',
};



const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop:spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: spacing(1)
    },
    form: {
        width: '100%', 
        marginTop:spacing(3),
    },
    submit: {
        margin:spacing(3, 0, 2),
    },
}));


function TabPanel(props) {
  const { children, value, index, ...other } = props;
  
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other} >
          
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
          
        </Box>
      )}
    </div>
  );
}


function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const month=["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
const d=new Date()
const timeStamp = d.getDate()+" "+month[d.getMonth()]+","+d.getFullYear()

export function Uploads() {
    const classes = useStyles();
    const [uploadError,setUploadError] = useState(false)
    const [recipeTitleData,setRecipeTitleData] = useState('')
    const [recipeTypeData,setRecipeTypeData] = useState('')
    const [photoUrl,setPhotoUrl] = useState('')
    const [videoUrl,setVideoUrl] = useState('')
    const { currentUser ,userName=''} = useAuth()
    console.log(userName)
    const email=currentUser?.email
    const profilePhotoUrl = currentUser?.photoURL
    const history = useHistory()
    

  const AddNewRecipe=async(r)=>{
      r.preventDefault()
      const collectionRef = collection(db,'Recipes')
      if(
          userName !== '' &&
          email !== '' &&
          recipeTitleData !== '' &&
          recipeTypeData !== '' &&
          photoUrl !== '' &&
          videoUrl !== '' &&
          ing !== [] &&
          steps !== [] &&
          timeStamp !== ''
        ){
      try{
      const payLoad={userName,email,recipeTitleData,recipeTypeData,photoUrl,videoUrl,ing,steps,timeStamp,profilePhotoUrl}
      const DID = await addDoc(collectionRef,payLoad)
      history.push('/')
      }
      catch(error){
          setUploadError(true)
      }
      }
      else{
          setUploadError(true)
      }
  }
    const dummyPhoto=(photoUrl === '')?
    <Card>
        <CardMedia
        component='img'
        height="194"
        alt="image not available"
        src='data:image/png;base64,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'
        />
    </Card> 
            :
    <Card>
        <CardMedia
            component='img'
            height="194"
            alt="image not available"
            src={photoUrl}
            sx={{ minWidth: 275 ,minHeight:275}}
            />
    </Card> 

    const dummyVideo=(videoUrl === '')?
    <Card>
        <CardMedia
        component='img'
        height="194"
        alt="image not available"
        src='data:image/png;base64,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'
        />
    </Card> 
            :
    <Card>
        <CardMedia
            component='iframe'
            height="194"
            alt="image not available"
            src={videoUrl}
            sx={{ minWidth: 275 ,minHeight:275}}
            />
    </Card> 

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
    setValue(newValue);
    };

    const {recipeList} = useRecipe()


  const [ing,setIng]=useState([])
  const [name,setName] = useState('')
  const [qty,setQty] = useState('')
  const [note,setNote] = useState('')
  
  function addIng(e){
       e.preventDefault()
       if(name !== '' && qty !== '' && note !== ''){
       setIng([...ing,
        {id:Math.round(Math.random()*10000),
         name:name,
         qty:qty,
         note:(note)?note:'not specified'
        }])
       setName('')
       setQty('')
       setNote('')
    }
  }

  
  function deleteIngItem(del){
    setIng(ing.filter((item)=> item.id !== del.id))
  }

    const [steps,setSteps]=useState([])
  const [step,setStep] = useState('')


  function addSteps(e){
       e.preventDefault()
       if(step !== ''){
       setSteps([...steps,
        {id:Math.round(Math.random()*10000),
         step:step
        }])
       setStep('')
      }
  }

  function deleteStepItem(del){
    setSteps(steps.filter((item)=> item.id !== del.id))
  }
  
  return (      
    <>
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}></Box>
      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Add recipe" {...a11yProps(0)} />
          <Tab label={
            (currentUser?.email === 'gokulpollachi25@gmail.com' || 
                    currentUser?.displayName === 'Gokul L' ||
                    currentUser?.email === 'skillgallery75@gmail.com'
            )?
            "Admin" : "my uploads"} {...a11yProps(1)} />
      </Tabs>
    </Box>
    <TabPanel value={value} index={0}>
        {(currentUser?.email && userName !== '')?

        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className={classes.paper}>
        <Box
        sx={{
            '& > :not(style)': {
            m: 2,
            },
        }}>
        <Icon sx={{ fontSize: 50 }} color="primary">add_circle</Icon>
        </Box>
                <form className={classes.form} noValidate onSubmit={AddNewRecipe}>
                        {uploadError && <Alert severity="error" fullwidth>failed to upload try again</Alert>}
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="Recipe name"
                                onChange={(e)=>setRecipeTitleData(e.target.value)}
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Recipe type"
                                name="lastName"
                                autoComplete="lname"
                                onChange={(e)=>setRecipeTypeData(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            {dummyPhoto}
                            <Grid item  xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="photo"
                                label="photo URL : https://photoUrl.com/image123"
                                name="photo"
                                autoComplete="email"
                                onChange={(e)=> setPhotoUrl(e.target.value)}

                                sx={{marginTop:0.7}}
                            />


                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                              {dummyVideo}
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="video"
                                label="video URL :https://youtube.com/embed/AB12CD34EF5"
                                name="video"
                                onChange={(e) => setVideoUrl(e.target.value)}
                                sx={{marginTop:0.7}}
                            />
                        </Grid>
                    <Grid item xs={12}>
                        <List sx={style} component="nav" aria-label="mailbox folders">
                            <ListItem>
                            <ListItemText primary="Ingredients" />
                            </ListItem>
                            <Divider />
            {ing.map((item)=>(
            <Stack sx={{ width: '100%' }} spacing={2}>
             <Alert onClose={()=>deleteIngItem(item)} sx={{m:0.3}}>
                <Breadcrumbs aria-label="breadcrumb" sx={{color:'white'}}>
                <Typography color="text.primary" sx={{color:'white'}}>{item.name}</Typography>
                <Typography color="text.primary" sx={{color:'white'}}>{item.qty}</Typography>
                <Typography color="text.primary" sx={{color:'white'}}>{item.note}</Typography>
                </Breadcrumbs>
             </Alert>
            </Stack>
             ))
            }
            </List>
                  <form onClick={addIng}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                            label="ingredient name"
                            name="name"
                            autoComplete="lname"
                        />
                        <TextField
                            variant="outlined"
                            required
                            value={qty}
                            onChange={(e)=>setQty(e.target.value)}
                            fullWidth
                            label="quantity"
                            name="quantity"
                        />
                        <TextField
                            variant="outlined"
                            value={note}
                            onChange={(e)=>setNote(e.target.value)}
                            fullWidth
                            label="note for it "
                            name="ingredient note"
                        />
                        <Button type="submit" color="primary">
                        <Icon sx={{ fontSize: 50 }} color="primary">add_circle</Icon>           
                        </Button>
                </Box>
                </form>
                <Button type="submit" color="primary" fullWidth onClick={()=>setIng([])}>
                    remove all          
                </Button>
            </Grid>
                    <Grid item xs={12}>
                        <List sx={style} component="nav" aria-label="mailbox folders">
                            <ListItem>
                            <ListItemText primary="steps" />
                            </ListItem>
                            <Divider /> 
        {steps.map((item)=>(
            <Stack sx={{ width: '100%' }} spacing={2}>
             <Alert onClose={()=>deleteStepItem(item)}  sx={{m:0.3}}>
                <Typography color="text.primary" sx={{color:'white'}}>{item.step}</Typography>
             </Alert>
            </Stack>
        ))
        }
            </List>
            <form onClick={addSteps} >
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2,width:'100%' }} >
                        <TextField
                            variant="outlined"
                            required
                            value={step}
                            onChange={(e)=>setStep(e.target.value)}
                            fullWidth
                            label="eg:add steps here.."
                            name="step desc"
                        />
                        <Button type="submit" color="primary">
                        <Icon sx={{ fontSize: 50 }} color="primary">add_circle</Icon>           
                        </Button>
                </Box>
                </form>
                <Button type="submit" color="primary" fullWidth onClick={()=>setSteps([])}>
                    remove all          
                </Button>
                    </Grid>
                        <Grid item xs={12}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        upload recipe
                    </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
           :
        <Container component="main" maxWidth="sm">
        <div className={classes.paper}>
        <Box
        sx={{
            '& > :not(style)': {
            m: 2,
            },
        }}>
            <Typography>
                please login/signup with username to upload recipes !! 
            </Typography>
            <Link to="/login">
             Take me to login page
            </Link>
        </Box>
        </div>
        </Container>         
        }
      </TabPanel>
      <TabPanel value={value} index={1}>
      {(currentUser?.email === 'gokulpollachi25@gmail.com' || 
                    currentUser?.displayName === 'Gokul L' ||
                    currentUser?.email === 'skillgallery75@gmail.com'
                    )
                     ?
        <Grid container spacing={2} >
          {recipeList.map((item)=>(
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
          deletable={true}/* 
          editable={true} */
          />
        </Grid>
       ))}
     </Grid>
                     :
         <Grid container spacing={2} >
          {recipeList.filter((it)=>it.email === currentUser?.email).map((item)=>(
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
          deletable={true}/* 
          editable={true} */
          />
        </Grid>
         ))}
         </Grid>
      }    
      </TabPanel>
    </>
  );
}
