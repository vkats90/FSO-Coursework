import OneCountry from "./OneCountry";
import { useState } from "react";

const CountryDisplay = ({ cntry }) => {
  const [current, setCurrent] = useState();

  const handleClick = (x) => () => {
    current && x.name.common === current.name.common
      ? setCurrent()
      : setCurrent(x);
  };

  if (cntry.length > 10) return <p>Too many countries, be more specific</p>;
  if (cntry.length === 0) return <p>No countries found</p>;
  if (cntry.length > 1) {
    return cntry.map((x) => (
      <li key={x.coic}>
        {x.name.common}{" "}
        <button onClick={handleClick(x)}>
          {current && x.name.common === current.name.common ? "hide" : "show"}
        </button>
        {current && x.name.common === current.name.common ? (
          <OneCountry country={current} />
        ) : (
          <></>
        )}
      </li>
    ));
  }
  if (cntry.length === 1) return <OneCountry country={cntry[0]} />;
};

export default CountryDisplay;
