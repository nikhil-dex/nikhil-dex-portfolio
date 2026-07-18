export function kf(progress, stops) {
  if (progress <= stops[0][0]) return stops[0][1];
  for (let i = 1; i < stops.length; i++) {
    if (progress <= stops[i][0]) {
      const [p0, v0] = stops[i - 1];
      const [p1, v1] = stops[i];
      return v0 + ((v1 - v0) * (progress - p0)) / (p1 - p0);
    }
  }
  return stops[stops.length - 1][1];
}