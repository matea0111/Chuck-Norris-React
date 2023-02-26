import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


const NavBar = () => {

    return (
      <>
        <Navbar bg="dark" variant="dark" fixed="top" 
>
            <Nav>
              <Nav.Link href={"/"}>Home</Nav.Link>
              <Nav.Link href={"/favourites"}>Favourites</Nav.Link>
            </Nav>
        </Navbar>
      </>
    );
};

export default NavBar;