import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Home = () => {
    const [activeTab, setActiveTab] = useState("D1");
    const [deviceData, setDeviceData] = useState({
        D1: { voltage: "-", current: "-", temperature: "-", history: { voltage: [], current: [], temperature: [] } },
        D2: { voltage: "-", current: "-", temperature: "-", history: { voltage: [], current: [], temperature: [] } },
    });

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:8080");

        socket.onmessage = (event) => {
            try {
                const messages = JSON.parse(event.data); // expects array like ["D1V12C34T56", "D2V22C44T88"]
                const updatedData = { ...deviceData };

                messages.forEach((message) => {
                    const parsed = parseData(message);
                    if (parsed && (parsed.deviceId === "D1" || parsed.deviceId === "D2")) {
                        const { deviceId, voltage, current, temperature } = parsed;

                        // Update current values
                        updatedData[deviceId].voltage = voltage;
                        updatedData[deviceId].current = current;
                        updatedData[deviceId].temperature = temperature;

                        // Update history
                        updatedData[deviceId].history.voltage.push(voltage);
                        updatedData[deviceId].history.current.push(current);
                        updatedData[deviceId].history.temperature.push(temperature);

                        // Limit history to the last 20 values
                        updatedData[deviceId].history.voltage = updatedData[deviceId].history.voltage.slice(-20);
                        updatedData[deviceId].history.current = updatedData[deviceId].history.current.slice(-20);
                        updatedData[deviceId].history.temperature = updatedData[deviceId].history.temperature.slice(-20);
                    }
                });

                setDeviceData(updatedData);
            } catch (error) {
                console.error("Error parsing WebSocket message:", error);
            }
        };

        return () => socket.close();
    }, [deviceData]);

    const parseData = (message) => {
        const match = message.match(/(D[12])V(\d+)C(\d+)T(\d+)/);
        if (match) {
            return {
                deviceId: match[1],
                voltage: parseInt(match[2], 10),
                current: parseInt(match[3], 10),
                temperature: parseInt(match[4], 10),
            };
        }
        return null;
    };

    const renderGraph = (data, label, color) => {
        return (
            <Line
                data={{
                    labels: Array.from({ length: data.length }, (_, i) => i + 1),
                    datasets: [
                        {
                            label: label,
                            data: data,
                            borderColor: color,
                            backgroundColor: `${color}33`,
                            tension: 0.4,
                        },
                    ],
                }}
                options={{
                    responsive: true,
                    plugins: {
                        legend: { display: false },
                    },
                    scales: {
                        x: { display: false },
                        y: { beginAtZero: true },
                    },
                }}
            />
        );
    };

    const renderDeviceData = (deviceId) => {
        const device = deviceData[deviceId];
        return (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={boxStyle}>
                    <h3>Voltage</h3>
                    <p>{device.voltage} V</p>
                    {renderGraph(device.history.voltage, "Voltage", "blue")}
                </div>
                <div style={boxStyle}>
                    <h3>Current</h3>
                    <p>{device.current} A</p>
                    {renderGraph(device.history.current, "Current", "green")}
                </div>
                <div style={boxStyle}>
                    <h3>Temperature</h3>
                    <p>{device.temperature} °C</p>
                    {renderGraph(device.history.temperature, "Temperature", "red")}
                </div>
            </div>
        );
    };

    const tabStyle = (isActive) => ({
        flex: 1,
        padding: "10px",
        textAlign: "center",
        cursor: "pointer",
        backgroundColor: isActive ? "#4caf50" : "#f0f0f0",
        color: isActive ? "white" : "black",
        transition: "background-color 0.3s ease",
    });

    const boxStyle = {
        width: "80%",
        margin: "20px 0",
        padding: "20px",
        borderRadius: "10px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
    };

    return (
        <div>
            <h1 style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                Live Device Data
            </h1>
            <div style={{ display: "flex", borderBottom: "1px solid #ccc" }}>
                <div style={tabStyle(activeTab === "D1")} onClick={() => setActiveTab("D1")}>
                    Device 1
                </div>
                <div style={tabStyle(activeTab === "D2")} onClick={() => setActiveTab("D2")}>
                    Device 2
                </div>
            </div>
            <div>{renderDeviceData(activeTab)}</div>
        </div>
    );
};


export default Home;