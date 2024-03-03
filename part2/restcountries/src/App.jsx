import { useState, useEffect } from 'react'
import countriesAPI from './services/countries'

const Filter = ({onChange}) => {
  return(
    <>
      find countries: <input onChange={onChange}/>
    </>
  )
}

const Country = ({filtered, countries}) => {
  return(
    <> 
      {
        countries ?
          ({
          
          })
          :
          null
      }
      {/* // {console.log("aaaa ", countries.map(country => country.name.common))} */}
    </>
  )
}

const App = () => {

  const [country, setCountry] = useState(null)
  const [countries, setCountries] = useState(null)

  useEffect(() => {
    countriesAPI
        .getAll()
        .then(response => {
          setCountries(response)
        })
  },[])

  const handleChange = (e) => {
   setCountry(e.target.value);
  }

  const FilterCountries = ({countries, country}) => {
    return (
      <Country filtered={country} countries={countries} /> 
    )
  }

  return(
    <>
      <Filter onChange={handleChange} />
      <FilterCountries countries={countries} country={country} />
    </>
  )
 
}
export default App
