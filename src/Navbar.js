import React, {useContext} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { auth, db } from './firebase';
import { signOut } from 'firebase/auth';
import { updateDoc, doc } from 'firebase/firestore';
import { AuthContext } from './context/auth';

import { PersonBadge, BoxArrowRight } from 'react-bootstrap-icons'

function Navbar() {
const navigate = useNavigate();
const {user} = useContext(AuthContext);
  const handleLogOut = async() =>{
    await updateDoc(doc(db, 'users', auth.currentUser.uid),{
      isOnline: false,
    } );
    await signOut(auth);
    navigate('/login');
  }
  return <Container>
        <nav>
        <h4>
        
        <Link to='/'>Chat C☕p</Link>
        
        </h4>
        <right>
            {user ? (<>
                <Link to='/profile'><h3><PersonBadge/></h3><p>Profile</p> </Link>
                <button onClick={handleLogOut}><h3 ><BoxArrowRight/> </h3><p>Logout</p></button>

              </>): (<>
                <Link to='/login'><h5>Login</h5></Link>
            <Link to='/register'><h5>Register</h5></Link>
              </>)
              
            }
            
        </right>
        </nav>

  </Container>;
}

export default Navbar;
const Container = styled.div`
display: flex;
align-items: center;
box-shadow: 0 5px 13px rgb(0 0 0 / 0.1);
width: 100vw;
background: #baffe4a1;
border-radius: 0 0 7px 7px;
margin-bottom: 0.5rem;
padding: 0 1rem 0 1rem;
border-bottom: 0.5px solid #addbc9;
 nav{
    display: flex;
    justify-content: space-between;
    width: 100%;

    right{
      display: flex;



h5, h3{
  padding: 0 1rem 0 1rem;
  text-shadow: 0 0 0.06em #87F, 0 0 0.06em #87F, 0 0 0.06em #87F;
  margin-bottom: 0;
}
p{
  margin-bottom: 0;
}

    }

   
    h4{
      text-shadow: 0 0 0.06em #87F, 0 0 0.06em #87F, 0 0 0.06em #87F;
      margin-bottom: 0;
    }
    button{
      border: none;
      background-color: transparent;
      border-radius: 50px;
      margin-bottom: 0;
    }
 }


a{
  text-decoration: none;
}
nav{
  display: flex;
align-items: center;
}
`;
