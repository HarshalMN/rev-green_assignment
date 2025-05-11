const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

// Enable CORS
app.use(cors());

// Create HTTP server
const server = http.createServer(app);

// Initialize WebSocket server instance
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('Client connected');

    const intervalId = setInterval(() => {
        const dataList = generateDeviceData();
        ws.send(JSON.stringify(dataList)); // sends ["D1VxxCyyTzz", "D2VxxCyyTzz"]
    }, 2000);

    ws.on('close', () => {
        console.log('Client disconnected');
        clearInterval(intervalId);
    });
});


function getRandomValue() {
    return Math.floor(Math.random() * 100); // 0–99
}

function generateDeviceData() {
    function formatDeviceData(deviceId) {
        const voltage = getRandomValue();
        const current = getRandomValue();
        const temperature = getRandomValue();
        return `${deviceId}V${voltage}C${current}T${temperature}`;
    }

    return [
        formatDeviceData('D1'),
        formatDeviceData('D2')
    ];
}


// Start HTTP + WebSocket server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
