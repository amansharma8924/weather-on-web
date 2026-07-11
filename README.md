# 🌤️ Weather Now

A simple, responsive weather web app that shows real-time weather for any city — or your current location — with a clean UI that changes theme based on the weather condition.

## Features

- 🔍 Search weather by city name
- 📍 Auto-detects your location on load (with fallback to a default city)
- 🎨 Dynamic background theme based on weather (clear, rain, snow, thunder, mist, clouds, night)
- 🌡️ Shows temperature, "feels like", humidity, and wind speed
- ⏳ Loading spinner and error handling (invalid city, bad API key, rate limits, network issues)
- 📱 Fully responsive design

## Demo

<img width="1918" height="970" alt="Screenshot 2026-07-11 212856" src="https://github.com/user-attachments/assets/595e9961-0d6a-47ab-aa3a-39ca34bffadf" />


## Tech Stack

- HTML5
- CSS3 (custom properties, flexbox, grid)
- Vanilla JavaScript (no frameworks)
- [OpenWeatherMap API](https://openweathermap.org/api)

## Getting Started

### Prerequisites

- A free API key from [OpenWeatherMap](https://home.openweathermap.org/users/sign_up)

### Setup

1. Clone the repository
   ```bash
   git clone https://github.com/amansharma8924/weather-now.git
   cd weather-now
   ```

2. Open `script.js` and add your API key:
   ```js
   const API_KEY = "YOUR_OPENWEATHERMAP_API_KEY";
   ```

3. Open `index.html` in your browser (or use a local dev server like Live Server).

## Project Structure

```
weather-now/
├── index.html      # Markup
├── style.css       # Styling and themes
├── script.js       # App logic and API calls
└── README.md
```

## Usage

- On first load, the app requests your location to show local weather.
- If location access is denied, it falls back to a default city.
- Use the search bar to check weather for any city worldwide.

## Notes / Known Limitations

- Requires an active internet connection.
- API key is used client-side — for production use, consider proxying requests through a backend to keep the key private.

## License

This project is open source and available under the [MIT License](LICENSE).
