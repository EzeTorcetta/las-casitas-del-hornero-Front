import { useEffect } from "react";
import Card from "react-bootstrap/Card";
import { useSelector, useDispatch } from "react-redux";
import { FuncionTypeRoomTypes } from "../../redux/Actions/Actions";

const TipoHabitacion = ({ id }) => {
  const dispatch = useDispatch();
  const TypeRoom = useSelector((state) => state.TypeRoom);

  useEffect(() => {
    dispatch(FuncionTypeRoomTypes(id));
  }, []);

  return TypeRoom.map((room, index) => (
    <div key={index}>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>{room.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{`$  ${room.price}`}</Card.Subtitle>
          <Card.Text>{room.people}</Card.Text>
          <Card.Link href="#">Card Link</Card.Link>
          <Card.Link href="#">Another Link</Card.Link>
        </Card.Body>
      </Card>
    </div>
  ));
};

export default TipoHabitacion;
