import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🌆 Smart City Dashboard</h1>
      <p>Monitor location-based air quality with real-time insights.</p>
      <Link to="/dashboard" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600">Go to Dashboard</Link>
    </div>
  );
}