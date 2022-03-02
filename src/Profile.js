import React, {useState, useEffect} from 'react';
import Duck from './Profilepic/psyduckcute.jpg';
import styled from 'styled-components';
import {Camera2} from 'react-bootstrap-icons';
import {Trash} from 'react-bootstrap-icons'
import {storage, db, auth} from './firebase';
import {ref,getDownloadURL, uploadBytes, deleteObject} from 'firebase/storage';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { useNavigate} from 'react-router-dom'


function Profile() {
  const [img, setImg] = useState('')
  const [user, setUser] = useState('');
  const navigate = useNavigate();
  useEffect(()=>{
    getDoc(doc(db, 'users', auth.currentUser.uid )).then((docSnap) =>{
      if(docSnap.exists){
        setUser(docSnap.data());
      }
    }
    );


    if (img) {
      const uploadImg = async () => {
        const imgRef = ref(
            storage, `avatar/${new Date().getTime()} - ${img.name}`

        );
       
        try{
          if (user.avatarPath){
            await deleteObject(storage, user.avatarPath)
          }
            const snap = await uploadBytes(imgRef, img);
            const url = await getDownloadURL(ref(storage, snap.ref.fullPath)); 
            await updateDoc(doc(db, 'users', auth.currentUser.uid),{
              avatar: url,
              avatarPath: snap.ref.fullPath
            });
            
            setImg('');
        }catch (err){
              console.log(err.message);
        }
      };
      uploadImg();
    }
  },[img]);
  const deleteImage = async() =>{

    try {
      const confirm = window.confirm('Delete Avatar');
      if(confirm){
        await deleteObject(ref(storage, user.avatarPath));
        await updateDoc(doc(db, 'users', auth.currentUser.uid),{
          avatar:'',
          avatarPath:'',
        });
         navigate('/');
      }
    } catch (err) {
      console.log(err.message);
    }

  }

  return (
    user ?(
    <Container>
    <section>
          <img-container>
            <img src={user.avatar ||Duck} alt="Avatar"/>
            <overlay>
                <inner-overlay>
                  <label htmlFor='photo'><Camera2/></label>
                  {user.avatar ? <Trash onClick={deleteImage}/> : null}
                  <input type="file" accept='image/*' style={{display: "none"}} id='photo' onChange={(e)=>setImg(e.target.files[0])}/>


                </inner-overlay>
            </overlay>
          </img-container>
          <text-container>
              <h4>{user.names}</h4>
              <p>{user.email}</p>
              <hr/>
              <small>Joined on: {user.createdAt.toDate().toDateString()} </small>
          </text-container>





    </section>
    </Container>): null
  )
}

export default Profile
const Container = styled.div`
margin: 0 8px 0 8px;
height: 150vh;
background-color: #c3ffe8;


section{
display: flex;
align-items: center;

border-radius: 15px;
box-shadow: 0 5px 13px rgb(0 0 0 / 0.4);

text-container{
display: flex;
flex-direction: column;
align-items: flex-start;
hr{
  margin-bottom: 0;
  margin-top: 0;
  height: 1px;
  width: 100%;
}

h4{
  margin-bottom: 0;
}
p{
  margin-bottom: 0;
  color: gray;
}
}
img-container{
position: relative;
margin-left: 10px;
margin-right: 10px;
margin-top: 10px;
margin-bottom: 10px;




  img{
    border-radius: 50%;
    height: 6.75rem;
    width: 6.75rem;
    transition: 0.5s ease-in-out all;

    :hover{
      opacity: 0.4;


      
    }
  }
  inner-overlay{
    
    svg{
  height: 2rem;
  width: 2rem;

  transition: 0.5s ease;
    opacity: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;

    :hover{
      opacity: 1;

      
    }
    
}  
  }

}
}

`;

