import { useEffect, useState } from 'react'
import axios from "axios"

function App() {
const [countries, setCountries] = useState([])
const [search, setSearch] = useState("")
const [selectedCountry, setSelectedCountry] = useState(null)
const [selectedCountryInfo, setSelectedCountryInfo] = useState("")
const [countriesToShow, setCountriesToShow] = useState([])

useEffect(() => {
    axios.get("https://studies.cs.helsinki.fi/restcountries/api/all")
          .then((res) => {
            const countryNames = res.data.map(country => country.name.common)
            setCountries(countryNames)
          })
  }, [])

  useEffect(() => {
    if(selectedCountry){
      axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${selectedCountry}`)
      .then(res => {
        setSelectedCountryInfo(res.data)
      })
    }
  },[selectedCountry])


  const searchInputHandler = (e) => {
    const input = e.target.value;
    setSearch(input)
  }
  useEffect(() => {
    const filteredCountries = (search === "") ? countries : countries.filter(country => {
      return country.toLowerCase().includes(search.toLowerCase())
    })
    setCountriesToShow(filteredCountries)
  }, [search, countries])

  useEffect(() => {
    if (countriesToShow.length === 1) {
      setSelectedCountry(countriesToShow[0])
    } else {
      setSelectedCountry(null)
      setSelectedCountryInfo("")
    }
  }, [countriesToShow])

  const handleShowButton = (name) => {
    console.log(name.toLowerCase())
    setCountriesToShow([name.toLowerCase()])
  }

  return (
    <>
      <form type="submit">
        <div>
          <label >find countries</label>
          <input type="text" value={search} onChange={searchInputHandler} />
        </div>
      </form>
      <ul>
      {countriesToShow.length > 10 ? (
          <p>Too many countries, specify another filter</p>
        ) : countriesToShow.length === 1 ? (
          <Country country={selectedCountryInfo} />
        ) : (
          <Countries countriesToShow={countriesToShow} handleShowButton={handleShowButton} />
        )}
       
      </ul>
    </>
  )
}

const Countries = ({countriesToShow, handleShowButton}) => {

  return (
    <ul>
      {countriesToShow.map((country, index) => (
        <li key={index}>{country} <button onClick={() => handleShowButton(country)}> show </button></li>
        
      ))}
    </ul>
  )
}

const Country = ({country}) => {
  if (!country){
    return null;
  } 

  return(
    <div>
      <h1>{country.name.official}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <h2>Languages</h2>
      <ul>
      {Object.values(country.languages).map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      <br />
      <img src={country.flags.png} alt={country.flags.alt}></img>

    </div>
  )
}

export default App
