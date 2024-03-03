import { useState, useEffect } from 'react';
import countriesAPI from './services/countries';
import Country from './components/Country';

const Filter = ({ onChange }) => {
  return (
    <>
      find countries: <input onChange={onChange} />
    </>
  );
};

const App = () => {
  const [country, setCountry] = useState(null);
  const [countries, setCountries] = useState(null);

  useEffect(() => {
    countriesAPI.getAll().then(response => {
      setCountries(response);
    });
  }, []);

  const handleChange = e => {
    setCountry(e.target.value);
  };

  return (
    <>
      <Filter onChange={handleChange} />
      <Country countries={countries} country={country}/>
    </>
  );
};

export default App;
