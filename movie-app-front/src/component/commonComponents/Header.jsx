const Header = ({ title, description }) => {
  return (
    <>
      <div className="row">
        <div className="col-12 mt-4 text-light text-center">
          <h1>{title}</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-12"></div>
        <p
          className="text-light font-weight-bold text-center "
          style={{ fontSize: 25 }}
        >
          {description}
        </p>
      </div>
    </>
  );
};
export default Header;
