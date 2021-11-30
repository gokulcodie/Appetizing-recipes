import './App.css'
import React from 'react'
import {RecipeProvider} from './Contexts/RecipeProvider'
import {AuthProvider,useAuth} from './Contexts/AuthProvider'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import {NavbarComp} from './Components/NavbarComp'
import GridComp from './Components/GridComp'
import {Uploads} from './Components/Upload'
import Login from './Components/Login'
import Signup from './Components/SignUp'
import LoadingComp from './Components/LoadingComp'
import SkeletonComp from './Components/SkeletonComp'
import { Offline } from 'react-detect-offline'
import NetworkComp from './NetworkComp'


function App() {
  return (
    <Router>
      <AuthProvider>
          <RecipeProvider>
            <NavbarComp/>
            <NetworkComp/>
            <Switch>
            <Route path="/" exact component={()=><GridComp/>}/>
            <Route path="/my uploads" component={()=><Uploads/>}/>
            <Route path="/admin" component={()=><Uploads/>}/>
            <Route path="/login" component={()=><Login/>}/>
            <Route path="/signup" component={()=><Signup/>}/>
          </Switch>
          <Offline>
          <SkeletonComp />{/* 
          <LoadingComp/> */}
          </Offline>
          </RecipeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
