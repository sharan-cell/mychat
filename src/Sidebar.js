import React from 'react'
import styled from 'styled-components'
function Sidebar() {
    return (
        <Container>
            <ul>
                <li>Home</li>
                <li>Chat</li>
                <li>Explore</li>
                <li>About</li>
                <li>Help</li>
               
            </ul>
        </Container>
    )
}

export default Sidebar
const Container = styled.div`
width: 10%;
height: 100vh;

ul{
    list-style: none;
    background-color: whitesmoke;
    height: 100%;
    margin: 0;
    padding-inline-start: 0;
    li{
        padding: 1rem 0 1rem 0;

            margin: 0 0 1rem 0;
        :hover{
            background-color: white;
            
        }
    }
}

`;