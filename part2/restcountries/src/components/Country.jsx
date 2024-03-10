import { useState } from "react";
import SingleCountry from "./SingleCountry";
import MultipleCountries from "./MultipleCountries";

const ShowAllCountries = ({countries}) => {
  return (
    <>
      {countries != null ? (
        countries
          .filter(country => country.name != null)
          .map(country => (
            <div key={country.id}>
              {country.name.common}
            </div>
          ))
      ) : (
        <p>Loading countries...</p>
      )}
    </>
  );
}

const ShowFilteredCountries = ({countries, countryName}) => {
  const filteredCountries = countries != null
        ? countries
            .filter(country => country.name.common.toLowerCase().includes(countryName.toLowerCase()))
        : [];

  return (
    <>
      {
        (filteredCountries.length > 10 && <p>Too many matches, specify another filter</p>)
        ||
        (filteredCountries.length === 1 && <SingleCountry filteredCountries={filteredCountries} />)
        ||
        (filteredCountries.length < 10 && <MultipleCountries filteredCountries={filteredCountries} /> )
      }
    </>
  );
}

const Country = ({ countries, country }) => {

  return(
    <>
      {
        country === null
        ? <ShowAllCountries countries={countries}/>
        : <ShowFilteredCountries countries={countries} countryName={country} />
      }
    </>
  )
    
  };

export default Country