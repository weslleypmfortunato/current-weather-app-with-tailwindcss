// import './HomePage.css'
import '../css/build.css'
import axios from 'axios'
import { useState } from 'react'
import '@fortawesome/fontawesome-free/css/all.css';

const apiKey = "9f049588121d9ab5edba6bc86d738feb"

const HomePage = () => {
  const [inputVal, setInputVal] = useState("")
  const [cities, setCities] = useState([])
  const [errorMsg, setErrorMsg] = useState("")
  const [isDark, setIsDark] = useState(true)

  const handleSubmit = e => {
  e.preventDefault()

  if (!inputVal) {
    setErrorMsg("Please enter a city name!")
    return;
  }

  axios.get(`${process.env.REACT_APP_API_URL}/weather?q=${inputVal}&appid=${apiKey}&units=metric`)
    .then(response => {
      const { main, name, sys, weather } = response.data
      const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`

      const newCity = {
        name,
        country: sys.country,
        temp: Math.round(main.temp),
        feels_like: Math.round(main.feels_like),
        temp_max: Math.round(main.temp_max),
        temp_min: Math.round(main.temp_min),
        description: weather[0]["description"],
        icon
      };

      const cityExists = cities.some(city => city.name === newCity.name)

      if (cityExists) {
        return setErrorMsg(`${newCity.name} is already added 😉`)
      }

      setCities(prevCities => [...prevCities, newCity])
      setInputVal("")
      setErrorMsg("")
    })
    .catch(() => {
      setErrorMsg("Type a valid city name!")
    })
}

  const handleInputChange = e => {
    setInputVal(e.target.value)
  }

  const handleDarkMode = e => {
    setIsDark(!isDark)
  }

  return (
    <div className={isDark === true ? "bg-mainblue h-full md:h-screen" : "bg-white m-auto"}>
      <i className={isDark === true ? "bg-white w-10 text-amber-400 text-xl font-bold px-2 py-1 mt-2 rounded fas fa-sharp fa-light fa-sun m-auto" : "bg-mainblue w-10 font-bold px-2 py-1 mt-2 rounded fas fa-sharp fa-light fa-moon text-amber-300 text-xl m-auto"}
      onClick={handleDarkMode}></i>
      <section>
        <div>
          <h1 className={isDark === true ? "font-bold m-4 text-xl md:text-4xl text-white" : "font-bold m-4 text-xl md:text-4xl text-mainblue"}>Current Weather</h1>
          <form onSubmit={handleSubmit} className='mb-4'>
            <div className='flex flex-col items-center gap-2 md:flex md:flex-row md:justify-center mb-2'>
              <input
                type="text"
                placeholder="Search for a city        🌎"
                value={inputVal}
                onChange={handleInputChange}
                className={isDark === true ? 'rounded-4 pl-2 mr-2 bg-amber-100 font-semibold' : "mr-2 font-semibold border-b-2 pl-2 rounded-4 border-gray-300 w-48"}
              />
              <button
                type="submit"
                className={isDark === true ? "px-2 rounded-4 mx-2 font-bold bg-amber-100 text-mainblue" : 'bg-mainblue px-2 rounded-4 text-white font-bold mx-2'}>
                CHECK
              </button>
            </div>
            <span className={isDark === true ? "text-white": "text-black"}>{errorMsg}</span>
          </form>
        </div>
      </section>
      <section className='px-4'>
        <div className='-ml-9 grid place-content-center'>
          <ul className='sm:-ml-2 flex flex-col md:flex md:flex-row flex-wrap'>
            {cities.length > 0 && cities.map(city => (
              <li key={city.name}>
                <div className={isDark === true ? 'flex flex-col items-center border border-gray-100 w-48 h-72 rounded shadow-2xl m-2 bg-blue-300' : "flex flex-col items-center border border-gray-200 w-48 h-72 rounded shadow-2xl m-2"}>
                  <img src={city.icon} alt={city.description} className='w-20 pt-2'/>
                  <div className={isDark === true ? "text-white" : "text-mainblue"}>
                    <h5>
                      <span className={isDark === true ? "text-white font-semibold" : "text-mainblue font-semibold"}>{city.name}</span>
                      <sup className={isDark === true ? "bg-amber-400 rounded-full p-1 font-bold border-2 border-mainblue" : "bg-amber-400 rounded-full p-1 font-bold border-2 border-mainblue"}>{city.country}</sup>
                    </h5>
                    <div className='mt-2'>{city.temp}<sup>°C</sup></div>
                    <figcaption className='mt-1'>{city.description}</figcaption>
                    <p className='mt-1'>Feels Like: {city.feels_like}<sup>°C</sup></p>
                    <div className='text-xs font-bold'>
                      <p>Max: {city.temp_max} <sup>°C</sup></p>
                      <p>Min: {city.temp_min} <sup>°C</sup></p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <footer className='grid place-content-center'>
        <div>
          <small className={isDark === true ? "text-white" : "text-black"}>Created by <a href="https://github.com/weslleypmfortunato" target="_blank" rel='noreferrer' className={isDark === true ? "text-amber-400 font-bold" : "text-blue-700"}>WPMF</a></small>
        </div>
      </footer>
    </div>
  )
}

 
export default HomePage;