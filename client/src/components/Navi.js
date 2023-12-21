import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Context from '../context/userContext';
import './Navi.css'

function Navi() {
  const userContext = useContext(Context);
  const brown ={color:"rgb(87 14 14 / 65%)"}
  return (
    <Navbar expand="lg" className="bg-body-tertiary sticky-top">
      <Container>
        <Navbar.Brand style={{color:"burlywood"}} className='my-story' href="./">MY STORY</Navbar.Brand>
        <Navbar.Toggle  className='' id='toggle' aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            
            {userContext.userInfo.name ? (
  <>
    <Nav.Link style={brown} className='Link' href="/explore">Explore</Nav.Link>
    <Nav.Link style={brown} className='Link' href="/MyProfile">My profile</Nav.Link>
    <Nav.Link style={brown} className='Link' href="/feed">Feed</Nav.Link>
    <Nav.Link style={brown} className='Link' href="/publishStory">Publish story</Nav.Link>
    <Nav.Link style={brown} className='Link' href="/LogOut">Log out</Nav.Link>
  </>
) : (
  <>
    <Nav.Link style={brown} className='Link' href="/logIn">Log in</Nav.Link>
    <Nav.Link  style={brown} className='Link' href="/SignUp">Sign up</Nav.Link>
  </>
)}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navi;