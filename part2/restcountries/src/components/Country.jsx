import { useState } from "react";

const SingleCountry = ({filteredCountries}) => {
  return (
    <>
      {filteredCountries
      .map(country => (
        <>
        <h1 key={country.id}>{country.name.common}</h1>
        <div key={country.id}>capital: {country.capital}</div>
        <div key={country.id}>area: {country.area}</div>
        <h4>languages: </h4>
        {Object.entries(country.languages).map(([code, language], index) => (
          <div key={index}>
            <ul><li>{language}</li></ul>
          </div>
        ))}
        <div>{country.flag}</div>
        </>
      ))}
    </>
  )
}

const MultipleCountries = ({filteredCountries}) => {
  const [renderSingleCountry, setRenderSingleCountry] = useState(false);
  const [singleCountry, setSingleCountry] = useState(null);
  
  const handleClick = (event) => {
    const country = filteredCountries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
    if(country!=null){
      setSingleCountry(country)
      setRenderSingleCountry(true)
    }
  }

  return (
    <>
      {
        renderSingleCountry === false ? (
          filteredCountries
           .map(country => (
             <div key={country.id}>
               {country.name.common}&nbsp;
               <button value={country.name.common} onClick={handleClick}>show</button>
             </div>
      )))
        :
        <SingleCountry filteredCountries={singleCountry} />
      }
    </>
  )
}

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