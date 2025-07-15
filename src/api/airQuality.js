import axios from 'axios';



export const fetchAirQuality = async (lat, lon) => {
  try {
    const targetUrl = `https://api.openaq.org/v2/latest?coordinates=${lat},${lon}&radius=50000&limit=1`;
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;

    const response = await axios.get(proxyUrl);
    const parsedData = JSON.parse(response.data.contents);

    if (!parsedData || !Array.isArray(parsedData.results) || parsedData.results.length === 0) {
      console.warn("No air quality data found for the given location.");
      return null;
    }

    const result = parsedData.results[0];
    const measurement = result.measurements?.[0] || {};

    return {
      city: result.city ?? "Unknown",
      country: result.country ?? "Unknown",
      temperature: "N/A", // OpenAQ doesn't provide temperature, remove if unused
      aqi: measurement.value ?? "N/A",
      parameter: measurement.parameter ?? "N/A",
      unit: measurement.unit ?? "",
    };
  } catch (error) {
    console.error('Error fetching air quality:', error);
    return null;
  }
};
