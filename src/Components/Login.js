import React, { useRef, useState } from "react"
import { Form,Card} from "react-bootstrap"
import {AuthProvider,useAuth } from "../Contexts/AuthProvider"
import { Link,useHistory} from "react-router-dom"
import Button from '@mui/material/Button';
import {Container} from 'react-bootstrap'

import {FcGoogle} from 'react-icons/fc'
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function Login() {
  const userNameRef=useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const {currentUser, login ,setUserName,signInWithGoogle} = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      await login(emailRef.current.value, passwordRef.current.value)
      setUserName(userNameRef.current.value)
      history.push("/")
    } catch {
      setError("Failed to log in")
    }
    //setLoading(false)
  }

  
  async function handleGSignIn(){
    await signInWithGoogle()
    history.push('/')
  }
  
  return (
    <>
    <Container className="d-flex align-items-center justify-content-center"
             style={{minHeight: "100vh"}}>
            <div className="w-100" style={{maxWidth:"400px"}}>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert severity="error">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="username">
              <Form.Label>username (optional)</Form.Label>
              <Form.Control type="text" ref={userNameRef} placeholder="required only for adding recipes"/>
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button 
            sx={{mt:3}}
            disabled={loading} 
            className="w-100" 
            type="submit" 
            color="primary"
            type="submit"
            variant="contained"
            >
              Log In
            </Button>
          </Form>
          <Card.Body style={{ textAlign: 'center' }}>
              or
          </Card.Body>
          <Button variant="outlined" fullWidth onClick={
                ()=>handleGSignIn()}>
                <FcGoogle size="22" style={{marginRight:'8px'}}/>
                sign in 
          </Button>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
    </Container>
    </>
  )
}


