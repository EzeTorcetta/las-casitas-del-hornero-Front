import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";

import style from "./Card.module.css";

function Cards({ id, name, image, province }) {
  // const ElementoDelArrayImage =
  //   image && (image.length === 0 || image.length > 0) ? image.shift() : null;

  // const imagen = image[0];

  return (
    <div className={style.container}>
      <Row xs={1} sm={2} lg={3} className="g-2">
        <Col key={id}>
          <Link to={`/detail/${id}`}>
            <Card className="bg-white text-white">
              {Array.isArray(image) ? (
                <Card.Img
                  src={image[0]}
                  alt="Card image"
                  className={style.img}
                />
              ) : (
                <Card.Img src={image} alt="Card image" className={style.img} />
              )}

              <Card.ImgOverlay>
                <Card.Title>{name}</Card.Title>
                <Card.Text>{province}</Card.Text>
              </Card.ImgOverlay>
            </Card>
          </Link>
        </Col>
      </Row>
    </div>
  );
}

export default Cards;
