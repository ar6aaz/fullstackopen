import { useState } from "react";
import SingleCountry from "./SingleCountry";

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

export default MultipleCountries