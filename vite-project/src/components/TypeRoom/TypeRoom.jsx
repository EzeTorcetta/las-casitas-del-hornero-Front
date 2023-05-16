//?---------------------------- IMPORTS --------------------------------
//react
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "react-bootstrap/Card";
//action
import { FuncionTypeRoomTypes } from "../../redux/Actions/Actions";

//?----------------- COMPONENTE ROOM TYPE  ------------------------------------
const TypeRoom = ({ id }) => {
  const dispatch = useDispatch();
  const typeRoom = useSelector((state) => state.typeRoom);

  useEffect(() => {
    dispatch(FuncionTypeRoomTypes(id));
  }, []);

  return typeRoom?.map((room, index) => (
    <div key={index}>
      <Card style={{ width: "18rem", margin: "10px" }}>
        <Card.Body>
          <Card.Title>{room.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{`$  ${room.price}`}</Card.Subtitle>
          <Card.Text>{room.people}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  ));
};

export default TypeRoom;
