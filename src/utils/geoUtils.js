const calculateDistance = (point1, point2) => {
    const R = 6371;
    const lat1 = toRadians(point1.lat);
    const lat2 = toRadians(point2.lat);
    const deltaLat = toRadians(point2.lat - point1.lat);
    const deltaLng = toRadians(point2.lng - point1.lng);

    const a = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) +
              Math.cos(lat1) * Math.cos(lat2) *
              Math.sin(deltaLng/2) * Math.sin(deltaLng/2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return Math.round(R * c * 100) / 100;
};

const toRadians = (degrees) => degrees * (Math.PI/180);

const getTransportMode = (distance) => {
    if (distance >= 500) return 'Aeroplane';
    if (distance >= 100) return 'Truck';
    return 'Mini Van';
};

module.exports = { calculateDistance, getTransportMode };