//?---------------------------- IMPORTS --------------------------------
import Row from "react-bootstrap/Row";
import { Cards } from "../Index.js";

//?----------------- COMPONENTE FAVORITES ------------------------------------
const PartnerHotels = ({hotels}) => {

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
