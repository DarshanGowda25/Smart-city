import { useState } from 'react';
import LocationTracker from '../components/LocationTracker';
import AirQualityCanvas from '../components/AirQualityCanvas';
import LazySection from '../components/LazySection';
import { fetchAirQuality } from '../api/airQuality';

export default function Dashboard() {
  const [airQuality, setAirQuality] = useState(null);

  const handleLocation = async ({ lat, lon }) => {
    const data = await fetchAirQuality(lat, lon);
    setAirQuality(data);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">📊 Dashboard</h2>
      <LocationTracker onLocation={handleLocation} />
      <LazySection>
        <h3 className="font-bold mb-2">Air Quality</h3>
        {airQuality ? (
          <AirQualityCanvas airQuality={airQuality} />
        ) : (
          <p>Overall AQI: 61</p>
        )}
      </LazySection>
    </div>
  );
}