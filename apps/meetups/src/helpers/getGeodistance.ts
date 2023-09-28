export function geoDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
	const R = 6371e3;
	const π = Math.PI;
	const { sin, cos, atan2 } = Math;
	const φ1 = (lat1 * π) / 180;
	const λ1 = (lon1 * π) / 180;
	const φ2 = (lat2 * π) / 180;
	const λ2 = (lon2 * π) / 180;
	const Δφ = φ2 - φ1;
	const Δλ = λ2 - λ1;

	const a = sin(Δφ / 2) ** 2 + cos(φ1) * cos(φ2) * sin(Δλ / 2) ** 2;
	const c = 2 * atan2(a ** 0.5, (1 - a) ** 0.5);
	const d = R * c;

	return d;
}
