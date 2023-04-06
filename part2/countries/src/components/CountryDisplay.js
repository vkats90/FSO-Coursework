const CountryDisplay = ({ cntry }) => {
  if (cntry.length > 10) return <p>Too many countries, be more specific</p>;
  if (cntry.length === 0) return <p>No countries found</p>;
  if (cntry.length > 1)
    return cntry.map((x) => <li key={x.coic}>{x.name.common}</li>);
  if (cntry.length === 1)
    return (
      <>
        <h2>{cntry[0].name.common}</h2>
        <p>Capital: {cntry[0].capital[0]}</p>
        <p>Area: {cntry[0].area} sqkm</p>
        <h3>Languages:</h3>
        <ul>
          {Object.values(cntry[0].languages).map((x) => (
            <li>{x}</li>
          ))}
        </ul>
        <img src={cntry[0].flags.png} width="200" alt="countryflag" />
      </>
    );
};

export default CountryDisplay;
