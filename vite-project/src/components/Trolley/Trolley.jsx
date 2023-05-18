import NavBar from "../Nav/Nav";
import Footer from "../Footer/Footer";
import style from "./Trolley.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetTrolley } from "../../redux/Actions/Actions";
import { PedirLocalStorage } from "../Index";

const Trolley = () => {
  const dispatch = useDispatch();
  const User = PedirLocalStorage();
  const Trolley = useSelector((state) => state.Trolley);

  console.log(Trolley);

  useEffect(() => {
    dispatch(GetTrolley(User.id));
  }, []);

  return (
    <>
      <NavBar />
      <section className={style.section}>
        {/* <Row xs={1} sm={2} lg={3} className="g-2">
          {Trolley?.map(({ id, name, image, province }) => (
            <Cards
              key={id}
              id={id}
              name={name}
              image={image}
              province={province}
            />
          ))}
        </Row> */}
      </section>
      <Footer />
    </>
  );
};

export default Trolley;
