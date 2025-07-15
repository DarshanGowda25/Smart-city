import { useEffect, useRef } from 'react';

export default function AirQualityCanvas({ airQuality }) {
  const canvasRef = useRef();

  useEffect(() => {
    if (!airQuality || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const pm25 = airQuality?.measurements?.find(m => m.parameter === 'pm25')?.value ?? 10;

    const radius = Math.max(20, Math.min(100, pm25 * 2));

    // Helper to determine color based on value
    const getColor = (value) => {
      if (value > 75) return '#8e0000'; // Very unhealthy
      if (value > 35) return 'red';
      if (value > 15) return 'orange';
      return 'green';
    };

    ctx.fillStyle = getColor(pm25);
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, 2 * Math.PI);
    ctx.fill();

    // Draw center text inside circle
    ctx.fillStyle = 'white';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`PM2.5`, canvas.width / 2, canvas.height / 2 - 10);
    ctx.fillText(`${pm25}`, canvas.width / 2, canvas.height / 2 + 10);

    // Draw label in bottom-left
    ctx.fillStyle = 'black';
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`Air Quality: PM2.5`, 10, canvas.height - 20);
  }, [airQuality]);

  return <canvas ref={canvasRef} width={300} height={200} className="border rounded shadow" />;
}
