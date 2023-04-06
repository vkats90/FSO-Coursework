import { useState, useEffect } from "react";
import getAll from "./services/server";
import CountryDisplay from "./components/CountryDisplay";

function App() {
  const [country, setCountry] = useState("");
  const [countryInfo, setCountryInfo] = useState();

  useEffect(() => {
    getAll().then((data) => {
      let searchResult = data.filter((x) =>
        RegExp(country, "gi").test(x.name.common)
      );

      setCountryInfo(searchResult);
    });
  }, [country]);

  const handleChange = (event) => {
    setCountry(event.target.value);
  };

  return (
    <div>
      find countries <input value={country} onChange={handleChange}></input>
      {country.length > 0 ? <CountryDisplay cntry={countryInfo} /> : <></>}
    </div>
  );
}

export default App;
