import React, { useState, useEffect } from "react";

const TrafficLight = () => {
  const [curTrafLight, setCurTrafLight] = useState(null);

  useEffect(() => {
    const timerId = setInterval(() => {
      fetch('http://localhost:3001/api/nextTrafficLight')
        .then(response => response.json())
        .then(data => {
          setCurTrafLight(data);
        })
        .catch(error => console.error('Error fetching next traffic light:', error));
    }, curTrafLight?.duration || 0);

    return () => {
      clearInterval(timerId);
    };
  }, [curTrafLight]);

  const availableColors = ["red", "green", "yellow"];

  return (
    <div className="wrapper">
      <div className="container">
        {availableColors.map((color, index) => (
          <div
            key={color}
            className="traffic-light"
            style={{
              background: curTrafLight?.color === color ? color : ""
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default TrafficLight;
