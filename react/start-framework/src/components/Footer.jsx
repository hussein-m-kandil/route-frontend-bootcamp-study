function Footer() {
  return (
    <footer className="footer bg-primary">
      <div className="container text-white py-5">
        <div className="row row-cols-sm-3 text-center py-4">
          <section className="p-3">
            <h3>LOCATION</h3>
            <address>
              2215 John Daniel Drive
              <br />
              Clark, MO 65243
            </address>
          </section>
          <section className="p-3">
            <h3>AROUND THE WEB</h3>
            <address>
              <i
                aria-label="Facebook"
                className="fa-brands fa-facebook p-2 mx-1 border rounded-circle"
              ></i>
              <i
                aria-label="Twitter"
                className="fa-brands fa-twitter p-2 mx-1 border rounded-circle"
              ></i>
              <i
                aria-label="LinkedIn"
                className="fa-brands fa-linkedin p-2 mx-1 border rounded-circle"
              ></i>
              <i
                aria-label="Website"
                className="fa-solid fa-globe p-2 mx-1 border rounded-circle"
              ></i>
            </address>
          </section>
          <section className="p-3">
            <h3>ABOUT FREELANCER</h3>
            <p>
              Freelance is a free to use, licensed Bootstrap theme created by
              Route
            </p>
          </section>
        </div>
      </div>
      <p className="bg-dark-primary text-white text-center py-4 px-2 m-0">
        Copyright &copy; Your Website 2025
      </p>
    </footer>
  );
}

export default Footer;
