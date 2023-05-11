import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import hotels from "../../data";
import style from "./Card.module.css";

function Cards() {
  return (
    <div className={style.container}>
      <Row xs={1} md={3} className="g-2">
        {hotels.map((hotel) => (
          <Col key={hotel.id}>
            <Card className="bg-white text-white">
              <Card.Img src={hotel.image} alt="Card image" />
              <Card.ImgOverlay>
                <Card.Title>{hotel.nombre}</Card.Title>
                <Card.Text>{hotel.direccion}</Card.Text>
                <Card.Text>{hotel.provincia}</Card.Text>
              </Card.ImgOverlay>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Cards;
