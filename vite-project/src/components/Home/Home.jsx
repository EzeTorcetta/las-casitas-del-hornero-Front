const Home = () => {
  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <form className="d-flex" role="search">
          <input className="form-control me-2" type="search" placeholder="¿Que hotel buscas?" aria-label="Search" />
          <button className="btn btn-outline-success" type="submit">
            Buscar
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Home;
