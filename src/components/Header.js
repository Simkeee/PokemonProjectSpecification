import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Styles.css"

function Header() {
  return (
    <Navbar className='nav-cont'>
      <Container>
        <Navbar.Brand className='logo' href="/"><b>Home</b></Navbar.Brand>
        <Navbar.Toggle />
      </Container>
    </Navbar>
  );
}

export default Header;