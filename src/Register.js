import React, {useState} from 'react';
import styled from 'styled-components';
import {createUserWithEmailAndPassword} from 'firebase/auth'
import { Link } from 'react-router-dom';
import {Alert} from 'react-bootstrap'
import { auth } from './firebase';
import { db } from './firebase';
import { setDoc, doc, Timestamp } from 'firebase/firestore';


function Register() {
const [data, setData] = useState({
names: '',

email: '',
password: '',
confirmpassword: '',
error: null,
loading: false,




});

const{names, email, password, confirmpassword, error, loading} = data;

const handleChange = (e) =>{
  setData({...data, [e.target.name]: e.target.value});
}


const handleSubmit = async(e) =>{
  e.preventDefault();
  setData({...data, error: null, loading: true});
  if(!names || !email || !password || !confirmpassword){
    setData({...data, error: 'All Fields Are Required'});
  }else if(password !== confirmpassword){
    setData({...data, error: 'Password Do not Match'});
  }try{
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, 'users', result.user.uid), {
      uid: result.user.uid,
      names,
      
      email,
      createdAt: Timestamp.fromDate(new Date()),
      isOnline: true,
    });
    setData({
      names: "",
     
      email:"",
      password:"",
      confirmpassword: "",
      error: null,
      loading: false,
    });
    
  }catch(err) {
      setData({...data, error: err.message, loading: false})
  }
}
  return (<Container>

<form onSubmit={handleSubmit}>
<input type="text" name='names' placeholder="Enter your Name" value={names} onChange={handleChange} />

<input type="email" name='email' placeholder="Email" value={email} onChange={handleChange} />
<input type="password" name='password' placeholder="Create Password" value={password} onChange={handleChange}/>
<input type="password" name='confirmpassword' placeholder="Re-enter Password" value={confirmpassword} onChange={handleChange}/>
{error ? <Alert variant='danger'>{error}</Alert>: null}
<button disabled={loading}><h5>{loading ? "Registering" : "Register"}</h5></button>
<p>ALready a User?<span><Link to="/login">Login</Link> </span> </p>



</form>





  </Container>);
}

export default Register;
const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
background: #baffe4a1;
height: 91.8vh;
form{
width: 15.5rem;

  display: flex;
  flex-direction: column;
  align-items: center;
input{
  padding: 0.5rem;
  margin: 0.25rem;
  border-radius: 5px;
  text-shadow: 0 0 0.044em #87F, 0 0 0.044em #87F, 0 0 0.044em #87F;
  border: none;
  
  :focus{
    outline: 1px solid grey;
    box-shadow: 0 5px 13px rgb(0 0 0 / 0.2);
  }
}
span{
  text-shadow: 0 0 0.06em #87F, 0 0 0.06em #87F, 0 0 0.06em #87F;
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
    text-shadow: 0 0 0.06em #87F, 0 0 0.06em #87F, 0 0 0.06em #87F;
    box-shadow: 0 5px 13px rgb(0 0 0 / 0.4);
  }

  h5{
    margin-block-end: 0;
  }
}
}



`;