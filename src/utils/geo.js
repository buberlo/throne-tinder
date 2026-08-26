const EARTH_RADIUS_KM = 6371;
const MIN_REGION_DELTA = 0.01;

const DEFAULT_REGION = {
  latitude: 37.7749,
  longitude: -122.4194,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

function toRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

function isValidCoordinate(point) {
  return Boolean(
    point &&
      Number.isFinite(point.latitude) &&
      Number.isFinite(point.longitude)
  );
}

export function getDistanceKm(a, b) {
  if (!isValidCoordinate(a) || !isValidCoordinate(b)) {
    return Number.POSITIVE_INFINITY;
  }

  const lat1 = toRadians(a.latitude);
  const lat2 = toRadians(b.latitude);
  const dLat = toRadians(b.latitude - a.latitude);
  const dLon = toRadians(b.longitude - a.longitude);

  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));

  return EARTH_RADIUS_KM * c;
}

export function getDistanceMeters(a, b) {
  return getDistanceKm(a, b) * 1000;
}

export function formatDistance(meters) {
  if (!Number.isFinite(meters)) return '—';
  if (meters < 1000) return `${Math.round(meters)} m`;

  const km = meters / 1000;
  return `${km < 10 ? km.toFixed(1) : Math.round(km)} km`;
}

export function sortStallsByDistance(stalls, origin, { ascending = true } = {}) {
  if (!Array.isArray(stalls)) return [];

  if (!isValidCoordinate(origin)) {
    return stalls.map((stall) => ({
      ...stall,
      distanceMeters: Number.POSITIVE_INFINITY,
    }));
  }

  return stalls
    .map((stall) => ({
      ...stall,
      distanceMeters: getDistanceMeters(origin, stall),
    }))
    .sort((a, b) => (a.distanceMeters - b.distanceMeters) * (ascending ? 1 : -1));
}

export function getNearestStall(stalls, origin) {
  const sorted = sortStallsByDistance(stalls, origin);
  return sorted[0] || null;
}

export function getStallsWithinRadius(stalls, origin, radiusMeters) {
  return sortStallsByDistance(stalls, origin).filter(
    (stall) => stall.distanceMeters <= radiusMeters
  );
}

export function getMapCenter(stalls) {
  const points = (Array.isArray(stalls) ? stalls : []).filter(isValidCoordinate);

  if (!points.length) return null;

  const latitude =
    points.reduce((sum, point) => sum + point.latitude,