import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import FormularioUsuario from './FormularioUsuario';
import "./style.css";

const FormularioRegistrar = () => {
    return(
      <Tabs
      defaultActiveKey="home"
      id="uncontrolled-tab-example"
      className="tab"
    >
      <Tab eventKey="home" title="Reservar" >
        <FormularioUsuario />
      </Tab>
      
    </Tabs>
    )
}

export default FormularioRegistrar;