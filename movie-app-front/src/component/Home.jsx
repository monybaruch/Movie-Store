import React from "react";
import Header from "./commonComponents/Header";

const Home = () => {
  return (
    <>
      <Header
        title={
          <>
            Blockbuster <i className="bi bi-film"></i> App
          </>
        }
        description="welcome to the Blockbuster rental site"
      />
    </>
  );
};

export default Home;
