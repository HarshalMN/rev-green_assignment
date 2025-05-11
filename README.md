# RevoGreen

## Features

- **Real-Time Data**: Fetches live data from IoT devices using WebSocket.
- **Interactive Charts**: Visualize voltage, current, and temperature trends.
- **Device Switching**: Easily toggle between multiple devices.
- **Modern Frontend**: Built with React and Vite for fast development and performance.

## Project Structure

Workspace
(rerun without)
Collecting workspace information

Here’s a professional and clean README.md file for your project:

revogreen/ 
├── client/ # Frontend React application 
  ├── src/ # React components and main entry point 
  ├── pages/ # Page components (e.g., Home) 
  ├── vite.config.js
  └── package.json 
├── server/ # Backend Node.js server 
  ├── index.js # WebSocket and HTTP server 
  └── package.json 
|── README.md # Project documentation

  
## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/revogreen.git
   cd revogreen
2. Install dependencies for both the client and server:
  npm install
  cd client && npm install
  cd ../server && npm install

### Running the Application
Start both the client and server concurrently:
  npm run dev
  
Open your browser and navigate to http://localhost:5173 to view the frontend.

### Scripts
npm run dev: Starts both the client and server.
npm run client: Starts the React frontend only.
npm run server: Starts the Node.js backend only.

## Technologies Used
### Frontend
React: UI library for building interactive user interfaces.
Vite: Fast build tool for modern web projects.
Chart.js: Library for creating interactive charts.
React-ChartJS-2: React wrapper for Chart.js.

### Backend
Node.js: JavaScript runtime for the server.
Express: Web framework for building APIs.
WebSocket: Real-time communication protocol.

## Folder Details
### Client
src/main.jsx: Entry point for the React application.
src/App.jsx: Main application component.
pages/home.jsx: Displays live device data and charts.

### Server
index.js: WebSocket server that generates and sends random device data.

## Future Enhancements
Add user authentication for secure access.
Support for more devices and dynamic device registration.
Store historical data in a database for long-term analysis.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
