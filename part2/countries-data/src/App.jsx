import { useEffect, useState } from 'react'
import axios from "axios"
import PropTypes from 'prop-types'

function App() {
const [countries, setCountries] = useState([])
const [search, setSearch] = useState("")
const [selectedCountry, setSelectedCountry] = useState(null)
const [selectedCountryInfo, setSelectedCountryInfo] = useState(null)
const [countriesToShow, setCountriesToShow] = useState([])
const [weatherData, setWeatherData] = useState(null)
const weatherAPI = import.meta.env.VITE_WEATHER_API
useEffect(() => {
    axios.get("https://studies.cs.helsinki.fi/restcountries/api/all")
          .then((res) => {
            const countryNames = res.data.map(country => country.name.common)
            setCountries(countryNames)
          })
          .catch((error) => {
            console.error("Error fetching countries:", error)
          })
  }, [])

  useEffect(() => {
    if(selectedCountry){
      axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${selectedCountry}`)
      .then(res => {
        setSelectedCountryInfo(res.data)
      })
      .catch((error) => {
        console.error("Error fetching country info:", error)
      })

    }
  },[selectedCountry])

useEffect(() => {
  if(selectedCountryInfo){
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${selectedCountryInfo.latlng[0]}&lon=${selectedCountryInfo.latlng[1]}&appid=${weatherAPI}&units=metric`)
      .then(res => {
        setWeatherData(res.data)
      })
  }
},[selectedCountryInfo, weatherAPI])


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
          <Country country={selectedCountryInfo} weatherData={weatherData}/>
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

Countries.propTypes = {
  countriesToShow: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleShowButton: PropTypes.func.isRequired,
}

const Country = ({country, weatherData}) => {
  console.log(weatherData)
  if (!country){
    return <p>Couldnt load city</p>;
  } 

  if(!weatherData){
    return <p>Couldnt load weatherData</p>;
  }


  return(
    <div>
      <h1>{country.name.official}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <h2>Languages</h2>
      <ul>
      {country.languages && Object.values(country.languages).map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      <br />
      <img src={country.flags.png} alt={country.flags.alt}></img>
      <h2>Weather in {country.name.common}</h2>
      <p>Temperature is: {weatherData.main.temp} Celsius</p>
      <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt={weatherData.weather[0].description} />
      <p>wind {weatherData.wind.speed} m/s</p>
    </div>
  )
}

Country.propTypes = {
  country: PropTypes.shape({
    name: PropTypes.shape({
      official: PropTypes.string.isRequired,
      common: PropTypes.string
    }).isRequired,
    capital: PropTypes.arrayOf(PropTypes.string),
    area: PropTypes.number,
    languages: PropTypes.objectOf(PropTypes.string),
    flags: PropTypes.shape({
      png: PropTypes.string,
      alt: PropTypes.string
    })
  }),
  weatherData: PropTypes.shape({
    main: PropTypes.shape({
      temp: PropTypes.number
    }),
    wind: PropTypes.shape({
      speed: PropTypes.number
    }),
    weather: PropTypes.arrayOf(PropTypes.shape({
      icon: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })).isRequired,
  })
}

export default App
