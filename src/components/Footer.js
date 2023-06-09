import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Styles.css";

function Footer() {
  return (
    <Container fluid className="footer">
      <Container className="footer-mark">
        by Dimitrije Simic
      </Container>
    </Container>
  );
}

export default Footer;