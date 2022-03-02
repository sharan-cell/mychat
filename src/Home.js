import React,{useEffect, useState} from 'react';
import styled from 'styled-components';
import {db, auth, storage} from './firebase';
import {collection, query, where,onSnapshot, addDoc, Timestamp, orderBy, setDoc, doc, getDoc, updateDoc} from 'firebase/firestore'
import User from './User'
import Chatsection from './Chatsection';
import {ref,getDownloadURL, uploadBytes} from 'firebase/storage';
import MessagesBody from './MessagesBody';


function Home() {
const [users,setUsers] = useState([]);
const [chat , setChat] = useState("");
const [text, setText] = useState('');
const [img, setImg] = useState('');
const [msgs, setMsgs] = useState([])


const user1 = auth.currentUser.uid;

useEffect(()=>{
const userRef = collection(db, 'users');
const q = query(userRef, where('uid', 'not-in', [user1]));
const unsub = onSnapshot(q, (querySnapshot) =>{
  let users = [];
  querySnapshot.forEach((doc) =>{
    users.push(doc.data());
  });
  setUsers(users);
});
return () => unsub();
},[]);


const  selectUser = async(user) =>{
  setChat(user)
  
  const user2 = user.uid
  const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
  const msgRef = collection(db, 'messages', id, 'chat');
  const q = query(msgRef, orderBy('createdAt', 'asc'));
  onSnapshot(q, querySnapshot =>{
    let msgs = [];
    querySnapshot.forEach(doc =>{
      msgs.push(doc.data())
    });
    setMsgs(msgs);
  });
     const docSnap = await getDoc(doc(db, 'lastmsg', id));
     if (docSnap.data() && docSnap.data().from !== user1) {
       await updateDoc(doc(db, 'lastmsg', id),{ unread: false })
     }
};

const handleSubmit = async e =>{
  e.preventDefault();
  const user2 =chat.uid;
  const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;


  let url;
  if(img){
    const imgRef = ref(
      storage,
      `images/${new Date().getTime()} - ${img.name}`
    );
    const snap = await uploadBytes(imgRef, img);
    const dlurl = await getDownloadURL(ref(storage, snap.ref.fullPath));
    url = dlurl;
  }

  await addDoc(collection(db, 'messages', id, "chat"),{
    text,
    from: user1,
    to: user2,
    createdAt: Timestamp.fromDate(new Date()),
    media: url || '',

  });


  await setDoc(doc(db,'lastmsg', id),{
    text,
    from: user1,
    to: user2,
    createdAt: Timestamp.fromDate(new Date()),
    media: url || '',
    unread: true,
  });
  setText("");

}
  return (<Container>
<user-container>{users.map(user =><User key={user.id} user={user} selectUser={selectUser} user1={user1} chat={chat} />)} </user-container>
<message-container>
  {chat ? (
    <>
    <user-message>
    <h3>{chat.names}</h3>
    <messages>
      {
        msgs.length ? msgs.map((msg, i)=> <MessagesBody key={i} msg={msg} user1={user1} chat={chat} />): null
      }
    </messages>
    <Chatsection text={text} setText ={setText} handleSubmit={handleSubmit} setImg={setImg} />
  </user-message>
  
  </>
  ) : (
    <h3 className='no-conv'>Select user to start conversation</h3>
  ) }
</message-container>



  </Container>);
}

export default Home;
const Container = styled.div`
overflow-y: auto;
background-color: #c3ffe8;
position: relative;
display: grid;
grid-template-columns: 1fr 3fr;

height: calc(100vh - 70px);
width: 100vw;


@media (max-width: 480px) {
  grid-template-columns: 1fr 5fr;
}



user-container{
margin-top: 10px;
border-right: 2px solid gray;
overflow-y:  hidden;
height: 100vh;
    position: sticky;
    top: 10px;


}
message-container{
  position: relative;
  width: fit-content;



 
  user-message{
    padding: 10px;
    text-align: left;
    
    
 messages{
  height: calc(100vh-200px);
  overflow-y: auto;
  border-bottom: 1px solid black;
  
  
}
  

    h3{
      position: fixed;
      left: 50%;
      
      
    top: 10px;
    }
 
  }
  .no-conv{
  font-size: 20px;
  color: gray;
  text-align: center;
}
}


`;