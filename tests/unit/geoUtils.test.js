const { calculateDistance, getTransportMode } = require('../../src/utils/geoUtils');

describe('Geo Utils', () => {
    test('calculate distance between two points', () => {
        const point1 = { lat: 12.9716, lng: 77.5946 };
        const point2 = { lat: 19.0760, lng: 72.8777 };
        const distance = calculateDistance(point1, point2);
        expect(distance).toBeGreaterThan(800);
    });

    test('get transport mode based on distance', () => {
        expect(getTransportMode(600)).toBe('Aeroplane');
        expect(getTransportMode(200)).toBe('Truck');
        expect(getTransportMode(50)).toBe('Mini Van');
    });
});