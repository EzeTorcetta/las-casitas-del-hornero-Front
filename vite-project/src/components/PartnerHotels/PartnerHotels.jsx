//?---------------------------- IMPORTS --------------------------------
//react
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FuncionAllPartnerHotel } from "../../redux/Actions/Actions.js";
import { PedirLocalStorage } from "../Index.js";
import Row from "react-bootstrap/Row";
//css
import style from "./PartnerHotels.module.css";
//components
import { Cards } from "../Index.js";

//?----------------- COMPONENTE FAVORITES ------------------------------------
const PartnerHotels = () => {
  const dispatch = useDispatch();
  let User = PedirLocalStorage();
  const hotels = useSelector((state) => state.PartnerHotels);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      dispatch(FuncionAllPartnerHotel(User.id));
      setIsLoading(false);
    }
  }, []);

  console.log(hotels)

  return (
    <div>
      <section>
        <Row xs={1} sm={2} lg={3} className="g-2">
          {hotels?.map(({ id, name, image, province, rating }) => (
            <Cards
              key={id}
              id={id}
              name={name}
              image={image}
              rating={rating}
              province={province}
            />
          ))}
        </Row>
      </section>
    </div>
  );
};

export default PartnerHotels;
