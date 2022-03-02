import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import Duck from './Profilepic/psyduckcute.jpg';
import{onSnapshot,doc} from 'firebase/firestore';
import { db } from './firebase';
import './User.css'

function User({user, selectUser, user1, chat}) {
    const user2 = user?.uid;
    const [data, setData] = useState("")

    useEffect(()=>{
        const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

        let unsub = onSnapshot(doc(db,'lastmsg', id), (doc) =>{
            setData(doc.data())
        });
        return () => unsub();
    },[])


  return (
    <Container className={`${chat.names === user.names && "selected-user"}`} onClick={() => selectUser(user)}>
        <info>
            <user-details>
                <img src={user.avatar || Duck} alt='avatar' className={`${user.isOnline ? 'online' : 'offline'}`} /> 
                <h4>{user.names}</h4>
                {data?.from !== user1 && data?.unread && (
                    <small>New</small>
                )}
            </user-details>
            
        </info>
        {data && (
            <p>
            <strong>{data.from === user1 ? "me:" : null} </strong>{data.text}</p>
        )}

    
    </Container>
  )
}

export default User
const Container = styled.div`
margin-bottom: 10px;
padding: 10px;
cursor: pointer;
min-width: 4.26875 rem;

info{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
user-details{
display: flex;
align-items: center;

small{
    margin-left: 10px;
    background-color: blue;
    color: white;
    border-radius: 10px;
    padding: 2px 4px;
}



img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1px solid gray;

    
}

h4{
    margin-left: 10px;



@media (max-width: 480px) {
    display: none;
}
}
}
.online{
        border: 3px solid green;
       
 
    

        
    }
 .offline{
    border: 3px solid red;
    }

:hover{
    background: lightblue;
}
p{
    margin-bottom: 0;
    text-align: left;
    white-space: nowrap;
    width: 90%;
    overflow: hidden;
    text-overflow: ellipsis;




    /* @media (max-width: 768px) {
    display: none;
} */


    strong{
        margin-right: 15px;
    }
    @media (max-width: 480px) {
    display: none;
}
}

`;