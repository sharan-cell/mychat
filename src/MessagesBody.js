import React, {useRef, useEffect} from 'react'
import Moment from 'react-moment';
import styled from 'styled-components';
import './MessageBody.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function MessagesBody  ({msg, user1})  {
    const scrollRef = useRef();

    useEffect(() =>{
        scrollRef.current.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
    },[msg]);



  return (
    <Container className={`${msg.from === user1 ? "own" : ""}`} ref={scrollRef} >
    <p className={msg.from === user1 ? "me" : "friend"}>
        {msg.media ? <img src={msg.media} alt='message'/>: null }
        {msg.text}
        <br/>
        <small>
            <Moment  fromNow ago>{msg.createdAt.toDate()} </Moment>
        </small>

    </p>
    </Container>
  )
}

export default MessagesBody;
const Container = styled.div`
margin-top: 5px;
padding: 0 5px;
overflow-wrap: break-word;

@media (max-width: 480px) {
    padding: 0 2px;
}

p{
    padding: 10px;
    display: inline-block;
    max-width: 80% ;
    text-align: left;
    border-radius: 5px;
    
    

img{
    width: 100%;
    border-radius: 5px;
}
small{
    display: inline-block;
    opacity: 0.8;
    margin-top: 15px;
}


}
.me{
    background-color: #56c89c;
    color: white;
    border-radius: 15px 15px 0 15px;
}
.friend{
background: #9090e6;
color: white;
border-radius: 0px 15px 15px 15px;
}



`;