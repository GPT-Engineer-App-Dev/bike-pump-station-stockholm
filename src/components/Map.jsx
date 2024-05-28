import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import { Box, Spinner } from '@chakra-ui/react';
import { Random } from 'random-js';

// Custom icon for bike pump stations
const bikePumpIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [25, 25],
});

const Map = () => {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      // Generate random bike pump stations data
      const random = new Random();
      const generateRandomStations = (numStations) => {
        const stations = [];
        for (let i = 0; i < numStations; i++) {
          const latitude = random.real(59.3, 59.4, true);
          const longitude = random.real(18.0, 18.1, true);
          stations.push({
            id: i,
            name: `Station ${i + 1}`,
            address: `Address ${i + 1}`,
            latitude,
            longitude,
          });
        }
        return stations;
      };

      const randomStations = generateRandomStations(10); // Generate 10 random stations
      setStations(randomStations);
      setLoading(false); // Update loading state
    } catch (error) {
      console.error("Error generating stations data:", error);
    }
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <MapContainer center={[59.3293, 18.0686]} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {stations.map(station => (
        <Marker key={station.id} position={[station.latitude, station.longitude]} icon={bikePumpIcon}>
          <Popup>
            <strong>{station.name}</strong><br />
            {station.address}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;