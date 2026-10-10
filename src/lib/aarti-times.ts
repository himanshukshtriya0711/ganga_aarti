// Sunrise / sunset for Varanasi (SunCalc formulas), used to estimate
// today's Aarti timings. Pure functions — call them on the client only.

const VARANASI = { lat: 25.3069, lng: 83.0104 }; // Dashashwamedh Ghat
const IST = "Asia/Kolkata";
const istDay = new Intl.DateTimeFormat("en-CA", { timeZone: IST });
const istTime = new Intl.DateTimeFormat("en-IN", { timeZone: IST, hour: "numeric", minute: "2-digit", hour12: true });

const rad = Math.PI / 180;
const dayMs = 86_400_000;
const J1970 = 2440588;
const J2000 = 2451545;
const J0 = 0.0009;
const obliquity = rad * 23.4397;

const toJulian = (d: Date) => d.valueOf() / dayMs - 0.5 + J1970;
const fromJulian = (j: number) => new Date((j + 0.5 - J1970) * dayMs);
const toDays = (d: Date) => toJulian(d) - J2000;
const meanAnomaly = (d: number) => rad * (357.5291 + 0.98560028 * d);
const eclipticLongitude = (M: number) => {
  const C = rad * (1.9148 * Math.sin(M) + 0.02 * Math.sin(2 * M) + 0.0003 * Math.sin(3 * M));
  return M + C + rad * 102.9372 + Math.PI;
};
const approxTransit = (Ht: number, lw: number, n: number) => J0 + (Ht + lw) / (2 * Math.PI) + n;
const solarTransitJ = (ds: number, M: number, L: number) =>
  J2000 + ds + 0.0053 * Math.sin(M) - 0.0069 * Math.sin(2 * L);

function sunTimes(date: Date, lat = VARANASI.lat, lng = VARANASI.lng) {
  const lw = rad * -lng;
  const phi = rad * lat;
  const d = toDays(date);
  const n = Math.round(d - J0 - lw / (2 * Math.PI));
  const ds = approxTransit(0, lw, n);
  const M = meanAnomaly(ds);
  const L = eclipticLongitude(M);
  const dec = Math.asin(Math.sin(obliquity) * Math.sin(L));
  const Jnoon = solarTransitJ(ds, M, L);
  const h0 = rad * -0.833;
  const w = Math.acos((Math.sin(h0) - Math.sin(phi) * Math.sin(dec)) / (Math.cos(phi) * Math.cos(dec)));
  const Jset = solarTransitJ(approxTransit(w, lw, n), M, L);
  const Jrise = Jnoon - (Jset - Jnoon);
  return { sunrise: fromJulian(Jrise), sunset: fromJulian(Jset) };
}

/** Noon IST of the Varanasi calendar day that contains `now`, shifted by `offsetDays`. */
function istNoon(now: Date, offsetDays = 0) {
  const [y, m, d] = istDay
    .format(now)
    .split("-")
    .map(Number);
  return new Date(Date.UTC(y, m - 1, d + offsetDays, 6, 30));
}

const roundTo5 = (d: Date) => new Date(Math.round(d.valueOf() / 300_000) * 300_000);

export type AartiSlot = {
  name: string;
  place: string;
  start: Date;
  end: Date;
};

function slotsFor(day: Date): AartiSlot[] {
  const { sunrise, sunset } = sunTimes(day);
  // Subah-e-Banaras begins before sunrise; the evening Aarti shortly after sunset.
  const morning = roundTo5(new Date(sunrise.valueOf() - 40 * 60_000));
  const evening = roundTo5(new Date(sunset.valueOf() + 15 * 60_000));
  return [
    { name: "Subah-e-Banaras Aarti", place: "Assi Ghat", start: morning, end: new Date(morning.valueOf() + 60 * 60_000) },
    { name: "Sandhya Ganga Aarti", place: "Dashashwamedh Ghat", start: evening, end: new Date(evening.valueOf() + 45 * 60_000) },
  ];
}

/** The Aarti that is live now, or else the next one to begin. */
export function nextAarti(now: Date) {
  const slots = [...slotsFor(istNoon(now)), ...slotsFor(istNoon(now, 1))];
  const live = slots.find((s) => now >= s.start && now < s.end);
  if (live) return { slot: live, live: true as const };
  const upcoming = slots.find((s) => s.start > now)!;
  return { slot: upcoming, live: false as const };
}

export function formatIstTime(d: Date) {
  return istTime.format(d).toUpperCase();
}

export function isTomorrowIst(d: Date, now: Date) {
  return istDay.format(d) !== istDay.format(now);
}

export function splitDuration(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  return {
    h: Math.floor(total / 3600),
    m: Math.floor((total % 3600) / 60),
    s: total % 60,
  };
}
