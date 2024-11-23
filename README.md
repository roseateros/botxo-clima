# Botxo Clima

A modern React Native weather application for the Basque Country Autonomous Community (CAPV) that provides detailed weather forecasts using the AEMET (Spanish State Meteorological Agency) API.

## Features

- 🌡️ Detailed weather forecasts for CAPV municipalities
- 📍 Default view for Bilbao, Bizkaia
- 🗺️ Province and town selection
- 📱 Horizontal scrolling daily forecasts
- 🏙️ Quick access to nearby cities
- 💫 Smooth animations and transitions
- 🎨 Modern UI with clean design
- 📱 Responsive layout for all device sizes

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or newer)
- npm or yarn
- React Native development environment
- Xcode (for iOS development)
- Android Studio (for Android development)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/roseateros/botxo-clima.git
cd botxo-clima
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Install iOS dependencies (iOS only):
```bash
cd ios
pod install
cd ..
```

4. Add your AEMET API key:
Replace the `API_KEY` constant in `App.js` with your AEMET API key:
```javascript
const API_KEY = 'your-api-key-here';
```

## Running the App

### iOS
```bash
npm run ios
# or
yarn ios
```

### Android
```bash
npm run android
# or
yarn android
```

## Project Structure

```
botxo-clima/
├── src/
│   ├── components/
│   │   └── WeatherDisplay.js
│   └── data/
│       └── towns.js
├── App.js
├── package.json
└── README.md
```

## Key Components

### App.js
- Main application component
- Handles province and town selection
- Manages API calls and data state
- Controls navigation and modal displays

### WeatherDisplay.js
- Displays weather information
- Horizontal scrolling forecast cards
- Manages date formatting and weather data presentation

### towns.js
- Contains CAPV municipality data
- Maps town codes to names and provinces

## API Integration

The app uses the AEMET OpenData API. To get your own API key:
1. Visit [AEMET OpenData Portal](https://opendata.aemet.es/)
2. Register for an account
3. Generate an API key

## Styling

The app uses a modern design system with:
- Custom shadows and elevations
- Consistent color palette
- Responsive typography
- Smooth animations
- Card-based layout

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/YourFeature`
3. Commit changes: `git commit -m 'Add YourFeature'`
4. Push to branch: `git push origin feature/YourFeature`
5. Submit a pull request

## Known Issues

- AEMET API may occasionally experience slowdowns
- Some municipalities might have limited forecast data

## Future Improvements

- [ ] Add weather icons
- [ ] Implement weather alerts
- [ ] Add temperature trends graphs
- [ ] Support for different languages
- [ ] Dark mode support
- [ ] Offline data caching
- [ ] Widget support
- [ ] Push notifications for weather alerts

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- AEMET for providing the weather data API
- React Native community for the excellent framework
- Contributors and maintainers

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.

## Security

To report security vulnerabilities, please use the GitHub Security tab or contact the maintainers directly.

---

Made with ❤️ for the Basque Country weather community
