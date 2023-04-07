import Weather from "./Weather";

const OneCountry = ({ country }) => {
  return (
    <>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area} sqkm</p>
      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages).map((x) => (
          <li>{x}</li>
        ))}
      </ul>
      <img src={country.flags.png} width="200" alt="countryflag" />
      <Weather city={country.capital[0]} />
    </>
  );
};

export default OneCountry;
