import React, {useState} from 'react';
import styled from 'styled-components';
import {signInWithEmailAndPassword} from 'firebase/auth'

import {Alert} from 'react-bootstrap'
import { auth } from './firebase';
import { db } from './firebase';
import { updateDoc, doc } from 'firebase/firestore';
import {useNavigate} from 'react-router-dom';

function Login() {
const [data, setData] = useState({

email: '',
password: '',

error: null,
loading: false,




});

const{ email, password, error, loading} = data;
let navigate = useNavigate();
const handleChange = (e) =>{
  setData({...data, [e.target.name]: e.target.value});
}


const handleSubmit = async(e) =>{
  e.preventDefault();
  setData({...data, error: null, loading: true});
  if( !email || !password){
    setData({...data, error: 'All Fields Are Required'});
  }try{
    const result = await signInWithEmailAndPassword(auth, email, password);
    await updateDoc(doc(db, 'users', result.user.uid), {
      uid: result.user.uid,
    
      
      
      isOnline: true,
    });
    setData({
      
      email:"",
      password:"",
      
      error: null,
      loading: false,
    });
  navigate('/');
    
  }catch(err) {
      setData({...data, error: err.message, loading: false})
  }
}
  return (<Container>

<form onSubmit={handleSubmit}>

<input type="email" name='email' placeholder="Email" value={email} onChange={handleChange} />
<input type="password" name='password' placeholder="Create Password" value={password} onChange={handleChange}/>

{error ? <Alert variant='danger'>{error}</Alert>: null}
<button disabled={loading}><h5>{loading ? "Entering": "Login"}</h5></button>




</form>





  </Container>);
}

export default Login;
const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
background: #baffe4a1;
height: 91.8vh;
form{
width: 13.5rem;

  display: flex;
  flex-direction: column;
  align-items: center;
input{
  padding: 0.5rem;
  margin: 0.25rem;
  border-radius: 5px;
  border: none;
  border: none;
  text-shadow: 0 0 0.044em #87F, 0 0 0.044em #87F, 0 0 0.044em #87F;
  :focus{
    outline: 1px solid grey;
  }
}
button{
  display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
  padding: 00.5rem;
  width:6.75rem;
  margin-top: 0.7rem;
  border-radius: 50px;
  border: none;
  
  background: white;
  
  font-size: 16.5px;
  font-weight: 600;
  color: #0d6efd;
  :hover{
    
    box-shadow: 0 5px 13px rgb(0 0 0 / 0.4);
  }

  h5{
    margin-block-end: 0;
  }
}
}







`;