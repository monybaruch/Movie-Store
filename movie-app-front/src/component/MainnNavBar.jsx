import logo from "../assets/images/blockbuster-logo.png";
import main from "../assets/images/background.jpg";
import { Navbar, Nav, Container } from "react-bootstrap";
const MainnNavBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">
          <img
            alt=""
            src={logo}
            width="75"
            height="75"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainnNavBar;
