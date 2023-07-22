import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState('');
  const [data2, setData2] = useState(['', '', '', '']);
  const [irrigrationStatus, setIrrigrationStatus] = useState('Close');

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8000/ws/serial/');
    socket.onmessage = (event) => {
      const jsonData = JSON.parse(event.data);
      setData(jsonData.data);
      const newData2 = jsonData.data.split(',');
      setData2(newData2);
      if (newData2[2] === '1') {
        setIrrigrationStatus('Open');
      } else if (newData2[3] === '1') {
        setIrrigrationStatus('Close');
      }
    };
    return () => socket.close();
  }, []);

  return (
    <div className="container">
      <div className="background"></div>
      <div className="stats">
        <h1>ALL INFORMATIONS</h1>
        <div className="stats-list">
          <div className="stat-item">
            <h4>Humidity</h4>
            <p>{data2[0]}%</p>
          </div>
          <div className="stat-item">
            <h4>Irrigation Status</h4>
            <p>{irrigrationStatus}</p>
          </div>
          <div className="stat-item">
            <h4>Speed</h4>
            <p>{(data2[1]*100/1023).toFixed(2)}%</p>
          </div>
          <div className="stat-item">
            <h4>Topic</h4>
            <p>{(data2[0] < 10 && irrigrationStatus === "Close") ? "Open the irrigation" : (data2[0] > 85 && irrigrationStatus === "Open" ) ? "Close the irrigation" : "You're good"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;