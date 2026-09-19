import type { DistrictId } from "./data";

/** World-space anchors shared by the Blender model and interactive map. */
export const CITY_DISTRICTS: {
  id: DistrictId;
  position: [number, number];
  color: string;
  english: string;
}[] = [
  { id: "start", position: [-11, 9], color: "#35766b", english: "GATEWAY" },
  { id: "transit", position: [-11, 0], color: "#658c9d", english: "TRANSIT" },
  { id: "earn", position: [-11, -9], color: "#537966", english: "FINANCE" },
  { id: "swap", position: [0, -9], color: "#579b92", english: "EXCHANGE" },
  { id: "pay", position: [11, -9], color: "#bb8b68", english: "MARKET" },
  { id: "collect", position: [11, 0], color: "#9a829a", english: "CULTURE" },
  { id: "identity", position: [11, 9], color: "#7c87a9", english: "IDENTITY" },
  { id: "join", position: [0, 9], color: "#ad7d75", english: "COMMONS" },
];
