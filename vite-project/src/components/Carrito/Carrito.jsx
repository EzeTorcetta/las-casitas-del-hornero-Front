import NavBar from "../Nav/Nav";
import Footer from "../Footer/Footer";
import style from "./Carrito.module.css";

const Carrito = () => {
  return (
    <>
      <NavBar />
      <section className={style.section}>
        {/* <Row xs={1} sm={2} lg={3} className="g-2">
          {TypeRoom?.map(({ id, name, image, province }) => (
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

export default Carrito;
