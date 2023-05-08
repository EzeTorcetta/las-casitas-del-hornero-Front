import styles from "./Formulario.module.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Nav from 'react-bootstrap/Nav';
const Formulario = () => {
  return (
        <div
          className="modal show"
          style={{ display: 'block', position: 'initial' }}
        >
          <Nav fill variant="tabs" defaultActiveKey="/home">
            <Nav.Item>
                <Nav.Link href="/home">Reserva</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-1">Publica</Nav.Link>
            </Nav.Item>
            </Nav>
          <Modal.Dialog>
            <Modal.Header closeButton>
              <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>
    
            <Modal.Body>
              <p>Modal body text goes here.</p>
            </Modal.Body>
    
            <Modal.Footer>
              <Button variant="secondary">Close</Button>
              <Button variant="primary">Save changes</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </div>
      );
    }
    

  

export default Formulario;
