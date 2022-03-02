import React from 'react'
import styled from 'styled-components';
import {PatchPlus, Send} from 'react-bootstrap-icons';

function Chatsection({text, setText, handleSubmit, setImg}) {
  return (
    <Container>
    <form onSubmit={handleSubmit}>
      <label htmlFor='upload'><PatchPlus /></label>
      <input  type='file' style={{display: 'none'}} id='upload' onChange={(e) => setImg(e.target.files[0])} />
      
      <input type='text' placeholder="Enter The Message" value={text} onChange={e=> setText(e.target.value)} />
      <button>
        <Send className='send-box' />
      </button>
    </form>
    </Container>
  )
}

export default Chatsection
const Container = styled.div`
position: fixed;
bottom: 10px;
left: 25%;
width: 80%;
height: 30px;
display: flex;
align-items: center;
background-color: white;

form{
  background: white;
display: flex;
align-items: center;
justify-content: center;
width: 95%;
padding: 4px 0 4px 0;

  input{
    height: 40px;
    width: 75%;
    border-radius: 5px;
    border: 0.5px solid grey;


    :focus{
      outline: none;
    }
    
  }




  button{
    border: none;
    outline: none;
    background: none;
     .send-box{
      transform: rotate(45deg);
     }
  }
}

svg{
  height: 2em;
  width:2em;
  margin: 0 10px 0 10px;

  :hover{
    fill: gray;
  }
 
}

`;