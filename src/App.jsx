import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./App.css";
import {
  faFacebook,
  faGoogle,
  faPinterest,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { useState, useEffect } from "react";
import {
  faDroplet,
  faWind,
  faCompass,
  faSun,
  faMoon,
  faCloudRain
} from "@fortawesome/free-solid-svg-icons";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState("cairo");
  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=df8e205e1aee4233a6c91213240811&q=${location}&days=3`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const data = await response.json();
      setWeatherData(data);
      setError(null);
    } catch (err) {
      setError('Error fetching weather data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  // Format date function
  const formatDate = (date) => {
    const dateObj = new Date(date);
    const weekday = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
    const day = dateObj.getDate();
    const month = dateObj.toLocaleDateString('en-US', { month: 'short' });
    
    return (
      <div className="date-display d-flex justify-content-between align-items-center w-100">
        <span className="weekday">{weekday}</span>
        <span className="date">{day} {month}</span>
      </div>
    );
  };

  return (
    <>
      <header>
        <nav className="container">
          <div className="row d-flex align-items-center justify-content-between py-3">
            {/* Logo and Title */}
            <div className="col-6 col-lg-4 mb-3 mb-lg-0">
              <div className="d-flex align-items-center justify-content-start justify-content-lg-start">
                <div className="logo">
                  <img src="/logoweather.png" alt="logo" />
                </div>
                <div className="logo-content ms-3">
                  <h1 className="mb-0">Weather</h1>
                  <p className="mb-0">tagline goes here</p>
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="col-2 col-lg-2 d-lg-none text-end">
              <button 
                className="navbar-toggler border-0"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <span className="navbar-toggler-icon"></span>
              </button>
          </div>

            {/* Navigation Links */}
            <div className={`col-12 col-lg-8 ${isMenuOpen ? 'd-block' : 'd-none'} d-lg-block`}>
              <nav className="links">
                <ul className="list-unstyled d-flex flex-column flex-lg-row justify-content-lg-end align-items-center gap-2 mb-0">
                  <li><a href="#" className="nav-link">Home</a></li>
                  <li><a href="#" className="nav-link">News</a></li>
                  <li><a href="#" className="nav-link">Live cameras</a></li>
                  <li><a href="#" className="nav-link">Photos</a></li>
                  <li><a href="#" className="nav-link">Contact</a></li>
            </ul>
              </nav>
            </div>
          </div>
        </nav>
      </header>

      <main className="py-5">
        <div className="container">
          {/* Search Bar */}
          <div className="search-container mb-5">
            <div className="search position-relative">
              <input 
                type="text" 
                className="form-control" 
                placeholder="Enter your location..." 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <button
                onClick={fetchWeatherData}
                className="position-absolute end-0 top-50 translate-middle-y me-2">
                Search
              </button>
            </div>
          </div>

          {/* Weather Cards */}
          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : error ? (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          ) : (
            <div className="weather-cards-container ">
              {weatherData?.forecast?.forecastday?.map((day, index) => (
                <div key={day.date} className="weather-card ">
                  <div className="weather-card-header">
                    {formatDate(day.date)}
                  </div>
                  <div className="weather-card-body">
                    <h3 className="location mb-3">{weatherData.location.name}</h3>
                    <div className="temperature mb-4">
                      <span className="degree">{day.day.avgtemp_c}°C</span>
                      <img 
                        src={day.day.condition.icon} 
                        alt={day.day.condition.text}
                        className="ms-3"
                      />
                    </div>
                    <p className="weather-status text-center mb-4">{day.day.condition.text}</p>
                    
                    <div className="weather-details">
                      <div className="detail-item">
                        <div className="icon">
                          <FontAwesomeIcon icon={faDroplet} className="text-info" />
                        </div>
                        <div className="info">
                          <span className="value">{day.day.avghumidity}%</span>
                          <span className="label">Humidity</span>
                        </div>
                      </div>

                      <div className="detail-item">
                        <div className="icon">
                          <FontAwesomeIcon icon={faWind} className="text-primary" />
                        </div>
                        <div className="info">
                          <span className="value">{day.day.maxwind_kph} km/h</span>
                          <span className="label">Wind Speed</span>
                        </div>
                      </div>

                      <div className="detail-item">
                        <div className="icon">
                          <FontAwesomeIcon icon={faCompass} className="text-success" />
                        </div>
                        <div className="info">
                          <span className="value">{day.hour[12].wind_dir}</span>
                          <span className="label">Wind Direction</span>
                        </div>
                      </div>

                      <div className="detail-item">
                        <div className="icon">
                          <FontAwesomeIcon icon={faCloudRain} className="text-warning" />
                        </div>
                        <div className="info">
                          <span className="value">{day.day.daily_chance_of_rain}%</span>
                          <span className="label">Chance of Rain</span>
                        </div>
                      </div>

                      <div className="detail-item">
                        <div className="icon">
                          <FontAwesomeIcon icon={faSun} className="text-warning" />
                        </div>
                        <div className="info">
                          <span className="value">{day.astro.sunrise}</span>
                          <span className="label">Sunrise</span>
                        </div>
                      </div>

                      <div className="detail-item">
                        <div className="icon">
                          <FontAwesomeIcon icon={faMoon} className="text-info" />
                        </div>
                        <div className="info">
                          <span className="value">{day.astro.sunset}</span>
                          <span className="label">Sunset</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="py-5">
        <div className="container">
          <div className="search-icons-footer">
            <div className="row gy-4">
              <div className="col-12 col-md-8">
                <div className="search position-relative">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your email to subscribe..."
                  />
                  <button className="position-absolute end-0 top-50 translate-middle-y me-2">
                    Subscribe
                  </button>
                </div>
              </div>

              <div className="col-12 col-md-4">
                <div className="icons d-flex align-items-center gap-3 justify-content-center justify-content-md-end">
                  <span className="social-icon">
                    <FontAwesomeIcon className="icons-size" icon={faFacebook} />
                  </span>
                  <span className="social-icon">
                    <FontAwesomeIcon className="icons-size" icon={faTwitter} />
                  </span>
                  <span className="social-icon">
                    <FontAwesomeIcon className="icons-size" icon={faPinterest} />
                  </span>
                  <span className="social-icon">
                    <FontAwesomeIcon className="icons-size" icon={faGoogle} />
                  </span>
                </div>
                </div>
                
              {/* <div className="col-12 text-center mt-4">
                <p className="mb-0">
                  Copyright 2014 Company name. Designed by Themezy. All rights reserved
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
