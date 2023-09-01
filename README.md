# WEATHER FORECAST WITH OPENWEATHER API

A simple weather forecast app that allows users to get the weather information for a specific location.

## Description

The Weather Forecast App is a web application built using React and Next.js. It provides users with the ability to search for a city and view its current weather information, including temperature, weather conditions, and more. Additionally, users can select a city from the search results to receive weather information as an SMS message using Twilio.

## Features

- Search for a city to get its weather forecast.
- Display current weather conditions, temperature, and other relevant information.
- Select a city from the search results to send weather information as an SMS message (using Twilio).

## Getting Started

### Prerequisites

Before you begin, make sure you have the following software installed:

- Node.js (at least version 12)
- npm (Node Package Manager)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/weather-forecast-app.git
   
2. Navigate to the project directory:
   ```

```bash
cd weather-forecast-app
```

3. Install the project dependencies:

```bash
npm install
```

4. Obtain an API key from the OpenWeather website and replace "YOUR_OPENWEATHER_API_KEY" in the code with your actual API key.

5. Set up a Twilio account and obtain your Twilio Account SID and Auth Token.

6. Register your phone number with Twilio and obtain a virtual phone number for sending SMS messages.

7. Replace "YOUR_TWILIO_ACCOUNT_SID", "YOUR_TWILIO_AUTH_TOKEN", and "YOUR_TWILIO_PHONE_NUMBER" in the code with your Twilio credentials.

## Usage

1. Run the application:

```
npm run dev
```

2. Open your web browser and navigate to http://localhost:3000 to access the Weather Forecast App.

3. Enter a city in the search bar to get its weather forecast.

4. Click on a city from the search results to receive its weather forecast as an SMS message on your registered phone number.

## License

This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) license

## Acknowledgements

- The weather forecast data is sourced from the OpenWeather API.
- SMS notifications are facilitated through Twilio's services.

For any questions or feedback, contact enacwest@gmail.com
