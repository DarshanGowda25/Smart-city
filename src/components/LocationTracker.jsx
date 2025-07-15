import { useEffect, useState } from "react";
import { fetchAirQuality } from "../api/airQuality";

const LocationTracker = () => {
  const [location, setLocation] = useState(null);
  const [airData, setAirData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });

        const data = await fetchAirQuality(latitude, longitude);

        if (!data) {
          setError("No air quality data available for this location.");
        } else {
          setAirData(data);
        }
      },
      (err) => {
        console.error("Geolocation error:", err);
        setError("Unable to access your location.");
      }
    );
  }, []);

  return (
    <div className="p-4 bg-white shadow rounded-lg w-full max-w-md mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4 text-center">Your Location</h2>

      <h1 className="text-center"><b>Air quality</b> : Moderate</h1>

      {location ? (
        <>
          <p><strong>Latitude:</strong> {location.latitude}</p>
          <p><strong>Longitude:</strong> {location.longitude}</p>

          {airData ? (
            <>
              <p><strong>City:</strong> {airData.city}</p>
              <p><strong>Country:</strong> {airData.country}</p>
              <p><strong>Parameter:</strong> {airData.parameter}</p>
              <p><strong>AQI:</strong> {airData.aqi} {airData.unit}</p>
            </>
          ) : (
            !error && <p>Loading air quality data...</p>
          )}
        </>
      ) : (
        <p>Getting your location...</p>
      )}
    </div>
  );
};

export default LocationTracker;
